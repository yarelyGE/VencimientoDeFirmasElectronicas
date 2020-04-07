
export interface Client {
    uid?: string;
    nameClient?: string;
    expirationDate?: string;
    rfc?: string;
    legalRepresentative?: string;
    legalRepresentativeExpirationDate?: string;
    legalRepresentativeRfc?: string;
    date?: Date;
    active?: boolean;
}