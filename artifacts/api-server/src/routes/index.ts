import { Router, type IRouter } from "express";
import healthRouter from "./health";
import destinationsRouter from "./destinations";
import packagesRouter from "./packages";
import bookingsRouter from "./bookings";
import blogRouter from "./blog";
import testimonialsRouter from "./testimonials";
import newsletterRouter from "./newsletter";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(destinationsRouter);
router.use(packagesRouter);
router.use(bookingsRouter);
router.use(blogRouter);
router.use(testimonialsRouter);
router.use(newsletterRouter);
router.use(contactRouter);

export default router;
