type ApiErrorProps = {
    text: string;
}

export default function ApiError({ text }: ApiErrorProps) {
    return (
        <div className="bg-error/10 border border-error/90 text-error px-4 py-3 rounded-lg text-sm mb-6 text-center">
            {text}
        </div>
    )
}