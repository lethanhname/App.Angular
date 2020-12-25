export class AppRole {

    public name: string;

    /**
     * From OpenID.
     */
    public product: string;
    public rowVersion: number;
}


export class Page<T> {
    results: Array<T>;
    recordsTotal: number;
}
