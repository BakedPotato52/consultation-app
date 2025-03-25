import { PrismaClient, UserRole, UserStatus, ConsultationStatus } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");
    // // Delete all Consultations
    // await prisma.consultation.deleteMany({});

    // // Delete all Users
    // await prisma.user.deleteMany({});

    // Create Admin user
    const admin = await prisma.user.create({
        data: {
            name: "Admin User",
            email: "admin@example.com",
            password: "admin123", // In production, this should be hashed
            role: UserRole.ADMIN,
            status: UserStatus.ACTIVE,
            bio: "System Administrator",
            phoneNumber: faker.phone.number(),
            emailNotifications: true,
            smsNotifications: true,
            image: faker.image.avatar(),
        },
    });

    // Create 15 Patients
    const patients = await Promise.all(
        Array.from({ length: 15 }).map(() =>
            prisma.user.create({
                data: {
                    name: faker.person.fullName(),
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    role: UserRole.PATIENT,
                    status: UserStatus.ACTIVE,
                    bio: faker.lorem.sentence(),
                    phoneNumber: faker.phone.number(),
                    emailNotifications: faker.datatype.boolean(),
                    smsNotifications: faker.datatype.boolean(),
                    image: faker.image.avatar(),
                    createdBy: admin.id,
                    updatedBy: admin.id,
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
                    role: UserRole.PSYCHIATRIST,
                    status: UserStatus.ACTIVE,
                    bio: faker.lorem.sentence(),
                    phoneNumber: faker.phone.number(),
                    cost: faker.number.float({ min: 50, max: 500, fractionDigits: 2 }),
                    emailNotifications: faker.datatype.boolean(),
                    smsNotifications: faker.datatype.boolean(),
                    image: faker.image.avatar(),
                    createdBy: admin.id,
                    updatedBy: admin.id,
                },
            })
        )
    );

    // Create 30 Consultations
    for (let i = 0; i < 30; i++) {
        const status = faker.helpers.arrayElement([
            ConsultationStatus.SCHEDULED,
            ConsultationStatus.IN_PROGRESS,
            ConsultationStatus.COMPLETED,
            ConsultationStatus.CANCELLED,
            ConsultationStatus.NO_SHOW
        ]);

        await prisma.consultation.create({
            data: {
                patientId: patients[Math.floor(Math.random() * 15)].id,
                psychiatristId: psychiatrists[Math.floor(Math.random() * 15)].id,
                cost: faker.number.float({ min: 50, max: 500, fractionDigits: 2 }),
                startTime: faker.date.future(),
                endTime: faker.date.future(),
                status: status,
                notes: status === ConsultationStatus.COMPLETED ? faker.lorem.paragraph() : null,
                cancellationReason: status === ConsultationStatus.CANCELLED ? faker.lorem.sentence() : null,
                createdBy: admin.id,
                updatedBy: admin.id,
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
