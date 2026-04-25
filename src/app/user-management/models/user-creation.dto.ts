// user-creation.dto.ts
export class UserCreationDTO {
    username: string = ''; // Nom d'utilisateur
    password?: string = ''; // Mot de passe
    role: string = ''; // Rôle de l'utilisateur (Provincial, Regional, etc.)
    provinceId?: number; // ID de la province pour les utilisateurs provinciaux
    regionId?: number; // ID de la région pour les utilisateurs régionaux
    fraternityId?: number; // ID de la fraternité pour les utilisateurs de type Berger
}
