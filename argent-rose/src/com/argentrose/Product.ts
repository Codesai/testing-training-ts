export class Product {
    private static readonly MIN_QUALITY = 0;
    private static readonly MAX_QUALITY = 50;
    private readonly description: string;
    private sellIn: number;
    private quality: number;

    constructor(description: string, sellIn: number, quality: number) {
        this.description = description;
        this.sellIn = sellIn;
        this.quality = quality;
    }

    public getSellIn(): number {
        return this.sellIn;
    }

    public decreaseSellIn(): void {
        this.sellIn = this.sellIn - 1;
    }

    public increaseQuality(delta: number): void {
        this.updateQuality(this.quality + delta);
    }

    public decreaseQuality(delta: number): void {
        this.updateQuality(this.quality - delta);
    }

    public isTheatrePasses(): boolean {
        return "Theatre Passes" === this.description;
    }

    public dropQualityToZero(): void {
        this.updateQuality(Product.MIN_QUALITY);
    }

    private static enforceQualityInvariant(newQuality: number): number {
        return Math.max(Product.MIN_QUALITY, Math.min(Product.MAX_QUALITY, newQuality));
    }

    private updateQuality(newQuality: number): void {
        this.quality = Product.enforceQualityInvariant(newQuality);
    }
}
