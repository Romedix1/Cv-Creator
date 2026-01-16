import { Dispatch, Fragment, SetStateAction } from "react"
import { Dot, Trash2 } from "lucide-react"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import { SkillsCategory } from "@/types/skillsCategory"
import { useTranslations } from "next-intl"
import Toggle from "@/components/ui/Toggle"
import ElementAddButton from "@/components/ui/ElementAddButton"
import SortableList from "@/components/ui/SortableList"
import SectionHeader from "@/components/cv-builder/SectionHeader"
import ToggleLevelBar from "@/components/ui/ToggleLevelBar"
import { Settings } from "@/types/settings"
import SkillsLevelSelector from "@/components/ui/SkillsLevelSelector"

type SkillsSectionProps = {
    settings: Settings;
    categories: SkillsCategory[];
    viewMode: string;
    setViewMode: Dispatch<SetStateAction<"list" | "categories">>;
    onSkillsChange: (newSkill: SkillsCategory[]) => void;
    onSettingsChange: (newType: Settings) => void;
}

export default function SkillsSection({ settings, categories, viewMode, setViewMode, onSkillsChange, onSettingsChange }: SkillsSectionProps) {
    const tInput = useTranslations("Inputs")
    const tButton = useTranslations("Button")
    const tBuilder = useTranslations("Builder")

    const handleAdd = (type: "category" | "skill", catId?: string) => {
        if (type === "category") {
            const newCat = { id: crypto.randomUUID(), name: "", skills: [] }
            onSkillsChange([...categories, newCat])
        } else if (type === "skill") {
            const newSkill = { id: crypto.randomUUID(), level: 0, name: "" }
            if (catId) {
                onSkillsChange(categories.map(item => item.id === catId ? { ...item, skills: [...item.skills, newSkill] } : item))
            } else {
                if (categories.length === 0) {
                    const newCatId = crypto.randomUUID()
                    onSkillsChange([{ id: newCatId, name: tBuilder("generalCategory"), skills: [newSkill] }])
                } else {
                    onSkillsChange(categories.map((cat, index) => index === 0 ? { ...cat, skills: [...cat.skills, newSkill] } : cat))
                }
            }
        }
    }

    const handleRemove = (type: "category" | "skill", catId: string, skillId?: string) => {
        if (type === "category") {
            onSkillsChange(categories.filter(item => item.id !== catId))
        } else if (type === "skill" && skillId) {
            onSkillsChange(categories.map(cat => cat.id === catId ? { ...cat, skills: cat.skills.filter(s => s.id !== skillId) } : cat))
        }
    }

    const handleCategoryNameChange = (catId: string, newName: string) => {
        onSkillsChange(categories.map(item => item.id === catId ? { ...item, name: newName } : item))
    }

    const handleSkillNameChange = (catId: string, skillId: string, newName: string) => {
        onSkillsChange(categories.map(cat => cat.id === catId ? { ...cat, skills: cat.skills.map(skill => skill.id === skillId ? { ...skill, name: newName } : skill)} : cat ))
    }

    const handleSettingsChange = <K extends keyof Settings>(field: K, newValue: Settings[K]) => {
        onSettingsChange({ ...settings, [field]: newValue });
    }

    const handleSkillLevelChange = (catId: string, skillId: string, newLevel: number) => {
        onSkillsChange(categories.map(cat => cat.id === catId ? { ...cat, skills: cat.skills.map(skill => skill.id === skillId ? { ...skill, level: newLevel } : skill)} : cat ))
    }

    const VIEWMODE_OPTIONS = [
        { value: "list", label: tInput("list") },
        { value: "categories", label: tInput("categories") }
    ]

    const flattenedSkills = viewMode === "list" ? categories.flatMap(cat => cat.skills.map(skill => ({ ...skill, catId: cat.id }))) : []

    return (
        <section className="px-3 mt-6 flex flex-col gap-6 sm:px-12 w-full">
            <div className="flex justify-between items-center mb-6">
                <SectionHeader step="skills" />
                <div className="w-4/12 flex justify-end">
                    <Toggle ariaLabel={tBuilder("changeView")} value={viewMode as "list" | "categories"} options={VIEWMODE_OPTIONS} onChange={(value) => { const newMode = value as "list" | "categories"; setViewMode(newMode); handleSettingsChange("skillsType", newMode); }} />
                </div>
            </div>

            <ToggleLevelBar label={tInput("showSkillLevel")} checked={settings.showSkillsLevel} onChange={(isChecked) => handleSettingsChange("showSkillsLevel", isChecked)} />

            <div className="flex flex-col gap-6">
                {viewMode === "categories" && (
                    <SortableList items={categories} onReorder={onSkillsChange} droppableId="skills-categories-list"
                        renderItem={(cat) => (
                            <div key={cat.id} className="space-y-3">
                                <div className="flex items-center gap-3 mb-4">
                                    <input id={`cat-label-${cat.id}`} aria-label={tInput("categoryName")} name={`category-${cat.id}`} placeholder={tInput("categoryName")} value={cat.name || ""} onChange={(event) => handleCategoryNameChange(cat.id, event.target.value)} className="font-semibold text-text-main bg-transparent outline-none placeholder:text-text-muted/50 w-full" />
                                    <Button variant="remove" onClick={() => handleRemove("category", cat.id)} aria-label={`${tButton("delete")} ${cat.name || tInput("missingCategory")}`} icon={<Trash2 aria-hidden="true" className="w-6 h-6" />} />
                                </div>

                                <div role="list">
                                    {cat.skills.map((skill, index) => (
                                        <Fragment  key={skill.id}>
                                            <div className={`flex items-center gap-3 ${!settings.showSkillsLevel && "mt-2"}`}>
                                                <Dot className="mt-7 stroke-6 sm:stroke-2" aria-hidden="true"/>
                                                <Input label={`${tInput("element")} ${index+1}`} name={`skill-${skill.id}`} type="text" placeholderValue={tInput("skillNamePlaceholder")} value={skill.name || ""} onChange={(e) => handleSkillNameChange(cat.id, skill.id, e.target.value)} />

                                                <Button className="mt-6" aria-label={`${tButton("deleteSkill")} ${skill.name || `${tInput("element")} ${index+1}`}`} variant="remove" icon={<Trash2 aria-hidden="true" className="w-6 h-6"/>} onClick={() => handleRemove("skill", cat.id, skill.id)} />
                                            </div>
                                            {(settings.showSkillsLevel && settings.template === "tech-minimal") && <SkillsLevelSelector selectedLevel={skill.level} onChange={(val) => handleSkillLevelChange(cat.id, skill.id, val)}/>}
                                        </Fragment>
                                    ))}
                                </div>

                                <ElementAddButton step="Skill" onAdd={() => handleAdd("skill", cat.id)} />
                            </div>
                        )}
                    />
                )}

                <div role="list">
                    {viewMode === "list" && (
                        <div className="relative border border-border rounded-xl bg-bg-main px-4 py-4 duration-200 hover:border-default-hover">
                            <div className="flex flex-wrap flex-col gap-2 mb-4">
                                {flattenedSkills.map((skill, index) => (
                                    <div key={skill.id} className="flex items-center gap-3">
                                        <Dot className="mt-7" aria-hidden="true"/>
                                        <Input label={`${tInput("element")} ${index+1}`} name={`flat-skill-${skill.id}`} type="text" placeholderValue={tInput("skillNamePlaceholder")} value={skill.name || ""} onChange={(e) => handleSkillNameChange(skill.catId, skill.id, e.target.value)} />

                                        <Button className="mt-6" aria-label={`${tButton("deleteSkill")} ${skill.name || `${tInput("element")} ${index+1}`}`} variant="remove" icon={<Trash2 aria-hidden="true" className="w-6 h-6"/>} onClick={() => handleRemove("skill", skill.catId, skill.id)} />
                                    </div>
                                ))}
                            </div>
                            <ElementAddButton step="Skill" onAdd={() => handleAdd("skill")} />
                        </div>
                    )}
                </div>
            </div>

            {viewMode === "categories" && (
                <ElementAddButton step="Category" onAdd={() => handleAdd("category")} />
            )}
        </section>
    )
}