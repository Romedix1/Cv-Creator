import { useTranslations } from "next-intl";
import ElementAddButton from "@/components/ui/ElementAddButton";
import SectionHeader from "@/components/ui/SectionHeader";
import { Rodo as RodoType} from "@/types/rodo";
import Input from "@/components/ui/Input";
import Toggle from "@/components/ui/Toggle";
import Button from "@/components/ui/Button";
import { Trash2 } from "lucide-react";

type RodoSectionProps = {
    rodo: RodoType[]
    onRodoChange: (newRodo: RodoType[]) => void
}

export default function RodoSection({ rodo, onRodoChange }: RodoSectionProps) {
    const tInput = useTranslations("Inputs")
    const tButton = useTranslations("Button")
    const tBuilder = useTranslations("Builder")
    const tAria = useTranslations("Aria")

    const clauseItem = rodo[0]

    const handleAdd = () => {
        if(rodo.length < 1) {
            const newItem: RodoType = {
                id: crypto.randomUUID(),
                type: "standard",
                value: tBuilder("rodoClauseText"),
                company: ""
            }

            onRodoChange([newItem])
        }
    }

    const handleChange = (field: keyof RodoType, value: string) => {
        if (!clauseItem) return

        const updatedItem = { ...clauseItem, [field]: value }

        if (field === "type") {
            if (value === "standard") {
                updatedItem.value = tBuilder("rodoStandardClauseText")
            } else if (value == "dedicated") {
                updatedItem.value = tBuilder("rodoDedicatedClauseText", { company: clauseItem.company })
            }
        }

        if (field === "company") {
            if (updatedItem.type === "dedicated") {
                updatedItem.value = tBuilder("rodoDedicatedClauseText", { company: value })
            }
        }

        onRodoChange([updatedItem])
    }

    const handleRemove = () => {
        onRodoChange([])
    }

    const CLAUSE_TYPE_OPTIONS = [
        { value: "standard", label: tInput("standardClause") },
        { value: "dedicated", label: tInput("dedicated") },
        { value: "custom", label: tInput("customClause") },
    ]

    const isCustom = clauseItem?.type === "custom"

    return (
        <section className="px-3 mt-6 flex flex-col gap-6 sm:px-12 w-full">
            <SectionHeader step="rodo" />

            {clauseItem && (
                <div className="flex border p-3 sm:p-4 rounded-xl gap-3 sm:gap-4 bg-bg-main flex-col">
                    <div className="flex justify-end">
                        <div>
                            <p id="type-label" className="mb-4">{tInput("customClauseLabel")}</p>
                            <Toggle ariaLabel={tAria("changeClauseType")} value={clauseItem.type} onChange={(value) => handleChange("type", value)} name="contentType" options={CLAUSE_TYPE_OPTIONS} />
                        </div>
                    </div>

                    {clauseItem.type === "dedicated" && (<Input type="text" name="company" value={clauseItem.company} label={tInput("companyLabel")} onChange={(event) => handleChange("company", event.target.value)} />)}

                    <div className="flex flex-col">
                        <label htmlFor="clauseText">{tInput("clauseTextLabel")}</label>
                        <textarea disabled={!isCustom} id="clauseText" className={`w-full h-37.5 p-3 border rounded-md focus:border-default outline-none placeholder:text-text-muted mt-6 ${!isCustom && "bg-text-muted/20 text-text-muted cursor-not-allowed"}`} placeholder={tInput("insertText")} value={clauseItem.value || ""} onChange={(e) => handleChange("value", e.target.value)} />
                    </div>

                    <Button className="border dark:bg-[#1F0A0A] bg-[#FEF2F2] border-error w-full mt-6" variant="secondary" icon={<Trash2 aria-hidden="true" className="w-6 h-6"/>} text={`${tButton("delete")} ${tButton("clause")}`} onClick={() => handleRemove()} />
                </div>
            )}

            {rodo.length < 1 && <ElementAddButton step={"Certificates"} onAdd={() => { handleAdd() }} />}
        </section>
    )
}