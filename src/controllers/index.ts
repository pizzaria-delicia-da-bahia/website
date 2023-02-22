import {
  NextApiRequest as NextRequest,
  NextApiResponse as NextResponse,
} from "next";
import { Service } from "@services/index";

interface Response extends NextResponse {}
interface Request extends NextRequest {}

export abstract class Controller<T> {
  constructor(protected service: Service<T>) {}
  abstract get: (req: Request, res: Response) => void;
  abstract post: (req: Request, res: Response) => void;
  abstract patch: (req: Request, res: Response) => void;
  abstract delete: (req: Request, res: Response) => void;
}
