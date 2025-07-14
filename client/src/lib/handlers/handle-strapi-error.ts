
interface StrapiError {
  status: number;
  name: string;
  message: string;
  details: Record<string, unknown>;
}

export function handleStrapiError(error: StrapiError) {
  console.log("************************");
  console.dir(error, { depth: null });
  console.log("************************");
}
