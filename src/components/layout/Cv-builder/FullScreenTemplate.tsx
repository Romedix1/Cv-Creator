import Button from "@/components/ui/Button";
import { X } from "lucide-react"

type FullScreenProps = {
    template: () => React.ReactNode;
    onClose: () => void;
}

export default function FullScreenTemplate({ template, onClose }: FullScreenProps) {
    return (
        <div className="fixed inset-0 z-20 w-screen h-screen bg-surface/80 backdrop-blur-sm overflow-y-auto">
            <Button variant="edit" className="absolute top-4 right-4" icon={<X className="w-6 h-6 sm:w-8 sm:h-8" />} onClick={onClose}/>

            <div className="flex items-start justify-center py-20" onClick={onClose}>
                <div className="transform origin-top scale-[0.5] sm:scale-[0.9] lg:scale-100 duration-300" onClick={(e) => e.stopPropagation()}>
                    <div className="w-148.75 min-h-210.5 bg-white">
                        {template()}
                    </div>
                </div>
            </div>
        </div>
    )
}