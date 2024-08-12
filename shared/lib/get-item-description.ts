export const getItemDescription = (
    size?: string | null,
    type?: string | null,
    description?: string | null
): string => {
    return description ||
        `${size ? `Size: ${size}, ` : ''}${type ? `Type: ${type}` : ''
            }`.trimEnd() ||
        ''
}