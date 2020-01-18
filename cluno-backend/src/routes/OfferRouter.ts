import { Router, Request, Response } from "express";
import DynamoDBService from "../services/DynamoService";

export class OfferRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get("/", this.listOffers);
    this.router.get("/:id", this.offerDetails);
  }

  public listOffers(req: Request, res: Response) {
    res.send(DynamoDBService.getAllVisibleOffers());
  }

  public offerDetails(req: Request, res: Response) {
    let id: String = String(req.params.id);

    let offer: any = DynamoDBService.getOffer(id);
    if (!offer) {
      res.status(404).send({
        message: "Offer not found",
        status: res.status
      });
    }
    res.status(200).send(offer);
  }
}

const offerRoutes = new OfferRouter();

export default offerRoutes.router;
