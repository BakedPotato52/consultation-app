import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");
    // // Delete all Consultations
    // await prisma.consultation.deleteMany({});

    // // Delete all Users
    // await prisma.user.deleteMany({});

    // Create 15 Patients
    const patients = await Promise.all(
        Array.from({ length: 15 }).map(() =>
            prisma.user.create({
                data: {
                    name: faker.person.fullName(),
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    role: "PATIENT",
                    bio: faker.lorem.sentence(),
                    phoneNumber: faker.phone.number(),
                    emailNotifications: faker.datatype.boolean(),
                    smsNotifications: faker.datatype.boolean(),
                    image: faker.image.avatar(),
                },
            })
        )
    );

    // Create 15 Psychiatrists
    const psychiatrists = await Promise.all(
        Array.from({ length: 15 }).map(() =>
            prisma.user.create({
                data: {
                    name: faker.person.fullName(),
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    role: "PSYCHIATRIST",
                    bio: faker.lorem.sentence(),
                    phoneNumber: faker.phone.number(),
                    cost: faker.number.float({ min: 50, max: 500, fractionDigits: 2 }),
                    emailNotifications: faker.datatype.boolean(),
                    smsNotifications: faker.datatype.boolean(),
                    image: faker.image.avatar(),
                },
            })
        )
    );

    // Create 30 Consultations
    for (let i = 0; i < 30; i++) {
        await prisma.consultation.create({
            data: {
                patientId: patients[Math.floor(Math.random() * 15)].id,
                psychiatristId: psychiatrists[Math.floor(Math.random() * 15)].id,
                cost: faker.number.float({ min: 50, max: 500, fractionDigits: 2 }),
                startTime: faker.date.future(),
                endTime: faker.date.future(),
                status: faker.helpers.arrayElement(["SCHEDULED", "COMPLETED", "CANCELLED"]),
            },
        });
    }

    console.log("Seeding complete.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
