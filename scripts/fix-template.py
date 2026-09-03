import re
import zipfile
from pathlib import Path

SRC = Path(r"C:\Users\werne\Downloads\RMCP Template.docx")
DEST = Path(r"D:\Y Risk It App\templates\rmcp-core.docx")


def unsplit_mustache(xml: str) -> str:
    def replacer(match: re.Match[str]) -> str:
        inner = re.sub(r"<[^>]+>", "", match.group(0))
        inner = inner.replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&")
        return inner

    return re.sub(r"\{\{.*?\}\}", replacer, xml, flags=re.DOTALL)


def patch_fields(xml: str) -> str:
    xml = unsplit_mustache(xml)
    # Married field incorrectly reused DIR_START_DATE in the source template.
    xml = xml.replace(
        "Married Y/N</w:t>",
        "Married Y/N</w:t>",
        1,
    )
    return xml


xml = zipfile.ZipFile(SRC).read("word/document.xml").decode("utf-8")
xml = unsplit_mustache(xml)

# After unsplitting, whole tags sit in XML text nodes. Replace the married duplicate.
# First occurrence of DIR_START_DATE after "Married Y/N" — replace only the second
# consecutive DIR_START_DATE that follows the start-date field.
xml = xml.replace("{{DIR_START_DATE}}", "{{DIR_START_DATE}}", 1)
# Replace the married misuse: pattern Start Date ... {{DIR_START_DATE}} Married Y/N {{DIR_START_DATE}}
xml = re.sub(
    r"(Start Date with Company</w:t>[\s\S]{0,400}\{\{DIR_START_DATE\}\}[\s\S]{0,400}Married Y/N</w:t>[\s\S]{0,400})\{\{DIR_START_DATE\}\}",
    r"\1{{DIR_MARRIED}}",
    xml,
    count=1,
)
xml = re.sub(
    r"(geographical areas[\s\S]{0,400})\{\{LOCATION\}\}",
    r"\1{{GEO_AREAS}}",
    xml,
    count=1,
    flags=re.I,
)

# Insert Director 2 tags into empty value slots by replacing the first empty
# paragraph after each Director 2 label. Safer: append tags after labels.
dir2 = [
    ("Capacity / Job Title", "DIR2_TITLE"),
    ("Name & Surname", "DIR2_NAME"),
    ("ID", "DIR2_ID"),
    ("Income Tax Number", "DIR2_TAX"),
    ("Start Date with Company", "DIR2_START_DATE"),
    ("Married Y/N", "DIR2_MARRIED"),
    ("Dependants", "DIR2_DEPENDENTS"),
    ("Physical Address", "DIR2_ADDRESS"),
    ("Cell phone Number", "DIR2_CELL"),
    ("Email Address", "DIR2_EMAIL"),
]
# Only mutate the Director 2 block: from "Director 2" until "Disclaimer"
parts = re.split(r"(Director 2)", xml, maxsplit=1)
if len(parts) == 3:
    head, mid, rest = parts[0], parts[1], parts[2]
    disc = rest.split("Disclaimer", 1)
    block, tail = disc[0], ("Disclaimer" + disc[1] if len(disc) == 2 else "")
    for label, key in dir2:
        tag = "{{" + key + "}}"
        if tag in block:
            continue
        block = block.replace(
            label,
            f"{label} {tag}",
            1,
        )
    xml = head + mid + block + tail

print("DIR_MARRIED", xml.count("{{DIR_MARRIED}}"))
print("GEO_AREAS", xml.count("{{GEO_AREAS}}"))
print("DIR2_NAME", xml.count("{{DIR2_NAME}}"))
print("COMPANY_NAME", xml.count("{{COMPANY_NAME}}"))
print("split leftover", len(re.findall(r"\{\{[^}]*<", xml)))

DEST.parent.mkdir(parents=True, exist_ok=True)
with zipfile.ZipFile(SRC) as zin, zipfile.ZipFile(DEST, "w", zipfile.ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        data = zin.read(item.filename)
        if item.filename == "word/document.xml":
            data = xml.encode("utf-8")
        zout.writestr(item, data)
print("wrote", DEST, DEST.stat().st_size)
