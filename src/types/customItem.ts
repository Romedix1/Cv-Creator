import { CustomElement } from "./customElement"

export type CustomItem = {
    id: string
    title: string
    description: string,
    startDate: string
    endDate: string
    elements: CustomElement[]
}