const nodemailer = require("nodemailer");

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Méthode non autorisée. Utilisez POST." });
    }

    const { fullname, email, phone ,courseName } = req.body;

    if (!fullname || !email || !phone) {
        return res.status(400).json({ error: "Tous les champs (nom complet, email, téléphone) sont requis." });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Configure email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
            subject: "Une nouvelle inscription à un cours.",
            text: `Vous avez une nouvelle soumission depuis votre page de destination :\n\nNom complet : ${fullname}\nEmail : ${email}\nTéléphone : ${phone}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h1 style="color: #4CAF50;">Vous avez une nouvelle inscription à un cours.</h1>
                    <h2 style="color: #333; margin-top: 10px;">${courseName}</h2>
                    <hr style="border: none; border-top: 2px solid #4CAF50; margin: 20px 0;" />
                    <p><strong>Nom complet :</strong> ${fullname}</p>
                    <p><strong>Email :</strong> ${email}</p>
                    <p><strong>Téléphone :</strong> ${phone}</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: "Email envoyé avec succès !" });
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
        return res.status(500).json({ error: "Échec de l'envoi de l'email." });
    }
}
