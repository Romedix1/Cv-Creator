import { CustomItem } from "./customItem"
import { CustomSectionType } from "./customSectionType"
import { CustomSectionLayout } from "./customSectionTypeLayout"

export type CustomSection = {
    id: string
    title: string
    type: CustomSectionType
    layout: CustomSectionLayout
    items: CustomItem[]
}