export class UserDTO {
    id: number = 0 ; // Initialisé à 0
    username!: string ; // Valeur par défaut
    password!: string ; // Valeur par défaut
    role!: string ;
    provinceId?: number; // Optionnel
    regionId?: number; // Optionnel
    fraternityId?: number; // Optionnel

}
