const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    // Create 15 patients
    const patients = await Promise.all(
        Array.from({ length: 15 }, (_, i) =>
            prisma.user.create({
                data: {
                    name: `Patient ${i + 1}`,
                    email: `patient${i + 1}@example.com`,
                    password: `password${i + 1}`,
                    role: "PATIENT",
                },
            })
        )
    );

    // Create 15 psychiatrists
    const psychiatrists = await Promise.all(
        Array.from({ length: 15 }, (_, i) =>
            prisma.user.create({
                data: {
                    name: `Psychiatrist ${i + 1}`,
                    email: `psychiatrist${i + 1}@example.com`,
                    password: `password${i + 1}`,
                    role: "PSYCHIATRIST",
                },
            })
        )
    );

    // Create some consultations
    const consultations = await Promise.all(
        Array.from({ length: 10 }, (_, i) => {
            const patient = patients[i % 15];
            const psychiatrist = psychiatrists[i % 15];

            return prisma.consultation.create({
                data: {
                    patientId: patient.id,
                    psychiatristId: psychiatrist.id,
                    startTime: new Date(Date.now() + i * 3600000), // Spaced 1 hour apart
                    endTime: new Date(Date.now() + (i + 1) * 3600000),
                    cost: Math.random() * 100 + 50, // Random cost between 50 and 150
                    status: "SCHEDULED",
                },
            });
        })
    );

    console.log("Seeding complete.", { patients, psychiatrists, consultations });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
