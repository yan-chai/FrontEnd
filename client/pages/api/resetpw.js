export default function handler(req, res) {
    if (req.method === 'POST') {
        res.status(200).json({ code: '200',message: "send Email to: " + req.body.email })
      } else {
        res.status(200).json({ code: '0', message: req.body.email })
      }
}
  