export const getThaiBaht = (value: number | string, digit?: number) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: digit || 0 }).format(parseFloat(String(value)));
}