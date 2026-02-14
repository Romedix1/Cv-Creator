"use client"

import { useState } from "react";
import SearchBar from './SearchBar';
import Template from '@/components/Template';
import TemplatePreview from './TemplatePreview';

const TEMPLATES_DATA = [
  { id: 'classic-corporate', name: 'Classic Corporate', category: "classic", image: "/images/Templates/classic-corporate.png" },
  { id: 'creative-accent', name: 'Creative Accent', category: "modern",  image: "/images/Templates/creative-accent.png" },
  { id: 'modern-blue', name: 'Modern Blue', category: "modern",  image: "/images/Templates/modern-blue.png" },
  { id: 'swiss-minimalist', name: 'Swiss Minimalist', category: "minimalist", image: "/images/Templates/swiss-minimalist.png" },
  { id: 'tech-minimal', name: 'Tech Minimal', category: "minimalist", image: "/images/Templates/tech-minimal.png" },
  { id: 'timeline-modern', name: 'Timeline Modern', category: "modern", image: "/images/Templates/timeline-modern.png" },
]

type FilterBarType = {
    canCreate: boolean;
}

export default function FilterBar({ canCreate }: FilterBarType) {
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
            <div className="grid w-full grid-cols-1 gap-8 lg:gap-10 md:w-8/12 lg:w-auto lg:grid-cols-2 xl:grid-cols-3 2xl:mt-6">
                {filteredTemplates.map((template) => {
                    return (
                        <Template key={template.id} templateId={template.id} name={template.name} image={template.image} onPreview={setSelectedTemplate} canCreate={canCreate} className="w-full"/>
                    )
                })}
            </div>

            {(selectedTemplate && activeTemplate) && (
                <TemplatePreview onClose={handleClose} id={activeTemplate.id} templateId={activeTemplate.id} name={activeTemplate.name} image={activeTemplate.image} canCreate={canCreate}/>
            )}
        </>
    )
}