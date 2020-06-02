
export interface Client {
    uid?: string;
    nameClient?: string;
    expirationDate?: string;
    rfc?: string;
    legalRepresentative?: string;
    legalRepresentativeExpirationDate?: string;
    legalRepresentativeRfc?: string;
    selloExpirationDate?: string;
    imssExpirationDate?: string;
    date?: Date;
    active?: boolean;
}