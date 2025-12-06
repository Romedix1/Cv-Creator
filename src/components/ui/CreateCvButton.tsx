type CreateCvButton = {
    className?: string;
}

export default function CreateCvButton({ className }: CreateCvButton) {
    return (
        <button className={`${className} bg-default px-5 py-2.5 rounded-lg font-semibold text-button-text`}>Create CV</button>
    )
}