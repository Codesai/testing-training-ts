import { Product } from "./Product";

export class ArgentRoseStore {
    private readonly inventory: Product[];

    constructor(inventory: Product[]) {
        this.inventory = [...inventory];
    }

    public update(): void {
        for (const product of this.inventory) {
            product.decreaseSellIn();

            if (product.isTheatrePasses()) {
                this.updateTheatrePasses(product, product.getSellIn());
            } else {
                this.updateRegularProduct(product, product.getSellIn());
            }
        }
    }

    private updateTheatrePasses(product: Product, newSellIn: number): void {
        if (newSellIn < 0) {
            product.dropQualityToZero();
        } else if (newSellIn <= 5) {
            product.increaseQuality(3);
        } else {
            product.increaseQuality(1);
        }
    }

    private updateRegularProduct(product: Product, newSellIn: number): void {
        const changeBeforeExpiry = 2;
        const decrease = (newSellIn <= -1) ? changeBeforeExpiry * 2 : changeBeforeExpiry;
        product.decreaseQuality(decrease);

    }
}
