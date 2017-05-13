declare namespace Bimage {
    interface Classes {
        load(): any;
        base64(): string | never;
        width(): number;
        height(): number;
    }
    type Attr = {
        [key: string]: string;
    };
}
declare class Bimage implements Bimage.Classes {
    path: string;
    attr: Bimage.Attr;
    image: any;
    constructor(path: string, attr?: Bimage.Attr);
    /**
     * Load image from given path
     *
     * @returns
     *
     * @memberof Bimage
     */
    load(): Promise<any>;
    /**
     * Get base64 data from image
     *
     * @returns
     *
     * @memberof Bimage
     */
    base64(): string;
    /**
     * Get image width
     *
     * @readonly
     *
     * @memberof Bimage
     */
    readonly width: any;
    /**
     * Get image height
     *
     * @readonly
     *
     * @memberof Bimage
     */
    readonly height: any;
    /**
     * Get image element node
     *
     * @readonly
     *
     * @memberof Bimage
     */
    readonly node: any;
}
export = Bimage;
