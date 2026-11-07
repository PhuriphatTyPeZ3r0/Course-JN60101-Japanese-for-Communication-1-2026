import json, os

p = os.path.expandvars(r"%LOCALAPPDATA%\CapCut\User Data\Projects\com.lveditor.draft\Assignment1-Grammar-Video-Prompt\draft_content.json")
with open(p, "r", encoding="utf-8") as f:
    d = json.load(f)

print("Total tracks:", len(d.get("tracks", [])))
for i, t in enumerate(d.get("tracks", [])):
    t_type = t.get("type")
    t_name = t.get("name")
    segs = t.get("segments", [])
    print(f"Track {i}: {t_type}, name={t_name}, segments={len(segs)}")
    for s in segs:
        tr = s.get("target_timerange", {})
        st = tr.get("start", 0) / 1e6
        dur = tr.get("duration", 0) / 1e6
        mid = s.get("material_id")
        mpath = "NOT FOUND"
        for v in d.get("materials", {}).get("videos", []):
            if v.get("id") == mid:
                mpath = v.get("path")
        for a in d.get("materials", {}).get("audios", []):
            if a.get("id") == mid:
                mpath = a.get("path")
        print(f"   [{st:.2f}s - {st+dur:.2f}s] {os.path.basename(mpath)}")
