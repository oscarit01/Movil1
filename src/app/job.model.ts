export interface Job {
  id?: string; // Opcional si utilizas Firestore o similar
  title: string;
  description: string;
  category: string;
  userId: string; // El ID del usuario que creó la oferta
  // Agrega otros campos según sea necesario
}
