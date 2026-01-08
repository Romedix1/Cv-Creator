"use client"

import SearchBar from "../ui/SearchBar";
import classicTemplate from '../../../public/images/Templates/classic-corporate.png';
import creativeTemplate from '../../../public/images/Templates/creative-accent.png';
import modernTemplate from '../../../public/images/Templates/modern-blue.png';
import swissTemplate from '../../../public/images/Templates/swiss-minimalist.png';
import techTemplate from '../../../public/images/Templates/tech-minimal.png';
import timelineTemplate from '../../../public/images/Templates/timeline-modern.png';
import Template from "../ui/Template";
import { useState } from "react";
import TemplatePreview from "../ui/TemplatePreview";

const TEMPLATES_DATA = [
  { id: 'classic-corporate', name: 'Classic Corporate', category: "classic", image: classicTemplate },
  { id: 'creative-accent', name: 'Creative Accent', category: "modern",  image: creativeTemplate },
  { id: 'modern-blue', name: 'Modern Blue', category: "modern",  image: modernTemplate },
  { id: 'swiss-minimalist', name: 'Swiss Minimalist', category: "minimalist", image: swissTemplate },
  { id: 'tech-minimal', name: 'Tech Minimal', category: "minimalist", image: techTemplate },
  { id: 'timeline-modern', name: 'Timeline Modern', category: "modern", image: timelineTemplate },
];

export default function FilterBar() {
    const [search, setSearch] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedTemplate, setSelectedTemplate] = useState("")

    const filteredTemplates = TEMPLATES_DATA.filter((template) => {
        const matchCategory = selectedCategory === "all" || template.category === selectedCategory

        const matchSearch = search ? template.name.toLowerCase().includes(search.toLowerCase()) : true

        return matchCategory && matchSearch
    })

    const activeTemplate = TEMPLATES_DATA.find(template => template.id === selectedTemplate)

    const handleClose = () => {
        setSelectedTemplate("")
    }

    return (
        <>
            <SearchBar setSelectedCategory={setSelectedCategory} search={search} setSearch={setSearch}/>
            <div className="grid gap-8 lg:gap-10 lg:grid-cols-2 xl:grid-cols-3 2xl:mt-6">
                {filteredTemplates.map((template, index) => {
                    return (
                        <Template key={index} id={template.id} name={template.name} image={template.image} onPreview={setSelectedTemplate}/>
                    )
                })}
            </div>

            {(selectedTemplate && activeTemplate) && (
                <TemplatePreview onClose={handleClose} id={activeTemplate.id} name={activeTemplate.name} image={activeTemplate.image} />
            )}
        </>
    )
}