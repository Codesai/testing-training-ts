import {ArgentRoseStore} from "../../../src/com/argentrose/ArgentRoseStore";
import {Product} from "../../../src/com/argentrose/Product";

describe("ArgentRoseStore", () => {
    const MIN_QUALITY = 0;
    const MAX_QUALITY = 50;

    it("Empty inventory stays empty after update", () => {
        const store = emptyStore();

        store.update();

        expect(store).toEqual(emptyStore());
    });

    it("Updating a non expired regular product decreases its quality by 2 and decreases its sell-in by 1", () => {
        const store = argentRoseStoreWith(regularProduct(30, 5));

        store.update();

        expect(store).toEqual(argentRoseStoreWith(regularProduct(29, 3)));
    });

    it("Non expired regular product's updated quality can not be negative", () => {
        const store = argentRoseStoreWith(regularProduct(30, 1));

        store.update();

        expect(store).toEqual(argentRoseStoreWith(regularProduct(29, MIN_QUALITY)));
    });

    it("Already expired regular product decreases quality twice as fast", () => {
        const store = argentRoseStoreWith(regularProduct(0, 5));

        store.update();

        expect(store).toEqual(argentRoseStoreWith(regularProduct(-1, 1)));
    });

    it("Already expired regular product's updated quality can not be negative", () => {
        const store = argentRoseStoreWith(regularProduct(-1, 2));

        store.update();

        expect(store).toEqual(
            argentRoseStoreWith(regularProduct(-2, MIN_QUALITY))
        );
    });

    it("Theatre Passes increases quality by 1 when sell-in is greater than 6 days", () => {
        const store = argentRoseStoreWith(theatrePasses(30, 5));

        store.update();

        expect(store).toEqual(argentRoseStoreWith(theatrePasses(29, 6)));
    });

    it("Theatre Passes's quality can't grow over 50 when sell-in is greater than 6 days", () => {
        const store = argentRoseStoreWith(theatrePasses(20, MAX_QUALITY));

        store.update();

        expect(store).toEqual(
            argentRoseStoreWith(theatrePasses(19, MAX_QUALITY))
        );
    });

    it("Theatre Passes increases quality by 3 when sell-in is between 1 and 6 days", () => {
        const store = argentRoseStoreWith(theatrePasses(6, 46));

        store.update();

        expect(store).toEqual(argentRoseStoreWith(theatrePasses(5, 49)));
    });

    it("Theatre Passes quality can't grow over 50 when sell-in is between 1 and 6 days", () => {
        const store = argentRoseStoreWith(theatrePasses(4, 48));

        store.update();

        expect(store).toEqual(
            argentRoseStoreWith(theatrePasses(3, MAX_QUALITY))
        );
    });

    it("Theatre Passes quality drops to 0 when expired", () => {
        const store = argentRoseStoreWith(theatrePasses(-1, 38));

        store.update();

        expect(store).toEqual(
            argentRoseStoreWith(theatrePasses(-2, MIN_QUALITY))
        );
    });

    it("When there are several products each one is updated", () => {
        const store = argentRoseStoreWith(theatrePasses(30, 5), regularProduct(5, 3));

        store.update();

        expect(store).toEqual(
            argentRoseStoreWith(theatrePasses(29, 6), regularProduct(4, 1))
        );
    });

    function theatrePasses(sellIn: number, quality: number): Product {
        return new Product("Theatre Passes", sellIn, quality);
    }

    function regularProduct(sellIn: number, quality: number): Product {
        return new Product("any not special product", sellIn, quality);
    }

    function emptyStore(): ArgentRoseStore {
        return argentRoseStoreWith();
    }

    function argentRoseStoreWith(...products: Product[]): ArgentRoseStore {
        return new ArgentRoseStore(products);
    }
});