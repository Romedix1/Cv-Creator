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

// text: {
//     id: string
//     title: string
//     type: CustomSectionType
//     layout: CustomSectionLayout
//     items: CustomItem[
//         {
//             id: string
//             title: string
//             description: string,
//             startDate: string
//             endDate: string
//         }
//     ]
// }

// detailed: {
//     id: string
//     title: string
//     type: CustomSectionType
//     layout: CustomSectionLayout
//     items: CustomItem[
//         {
//             id: string
//             title: string
//             startDate: string
//             endDate: string
//             elements?: CustomElement[
//                 {
//                     id: string
//                     type: string
//                     value: string
//                 }
//             ]
//         }
//     ]
// }

// list: {
//     id: string
//     title: string
//     type: CustomSectionType
//     layout: CustomSectionLayout
//     items: CustomItem[
//         {
//             id: string
//             elements?: CustomElement[
//                 {
//                     id: string
//                     value: string
//                 }
//             ]
//         }
//     ]
// }
