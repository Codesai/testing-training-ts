import {ArgentRoseStore} from "../../../src/com/argentrose/ArgentRoseStore";
import {Product} from "../../../src/com/argentrose/Product";

describe("ArgentRoseStore", () => {

    it("Updating a non expired regular product decreases its quality by 2 and decreases its sell-in by 1", () => {
        const store = argentRoseStoreWith(regularProduct(10, 3));

        store.update();

        expect(store).toEqual(argentRoseStoreWith(regularProduct(9, 1)));
    });

    it("Already expired regular product decreases quality twice as fast", () => {
        const store = argentRoseStoreWith(regularProduct(-2, 5));

        store.update();

        expect(store).toEqual(argentRoseStoreWith(regularProduct(-3, 1)));
    });

    function regularProduct(sellIn: number, quality: number): Product {
        return new Product("any not special product", sellIn, quality);
    }

    function theatrePasses(sellIn: number, quality: number): Product {
        return new Product("Theatre Passes", sellIn, quality);
    }

    function argentRoseStoreWith(...products: Product[]): ArgentRoseStore {
        return new ArgentRoseStore(products);
    }
});
