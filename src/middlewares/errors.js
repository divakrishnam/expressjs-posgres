export default function errorsMiddleware(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({ success: false, message: err.message });
}
