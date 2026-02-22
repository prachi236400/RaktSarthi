const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://raktsarthi:RaktSarthi2026@raktsarthi.qpwd8ja.mongodb.net/rtbms?retryWrites=true&w=majority';

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const User = require('./models/User');
  const BloodBank = require('./models/BloodBank');
  const BloodRequest = require('./models/BloodRequest');
  const BloodCamp = require('./models/BloodCamp');
  const Event = require('./models/Event');
  const Inventory = require('./models/Inventory');

  // Clear existing data
  await User.deleteMany({});
  await BloodBank.deleteMany({});
  await BloodRequest.deleteMany({});
  await BloodCamp.deleteMany({});
  await Event.deleteMany({});
  await Inventory.deleteMany({});
  console.log('Cleared existing data');

  // Hash password for all users
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('Test@1234', salt);

  // ============ USERS ============
  const users = await User.insertMany([
    {
      name: 'Prachi Singh',
      email: 'prachi@test.com',
      password: hashedPassword,
      phone: '9876543210',
      bloodGroup: 'O+',
      role: 'admin',
      isDonor: true,
      isAvailable: true,
      activeMode: 'donor',
      address: { street: 'MG Road', city: 'Delhi', state: 'Delhi', pincode: '110001' },
      location: { type: 'Point', coordinates: [77.2090, 28.6139] },
      donorInfo: {
        weight: 62, height: 165, gender: 'Female',
        dateOfBirth: new Date('1998-05-15'),
        donationCount: 5, totalDonations: 5,
        hemoglobinLevel: 13.5, bloodPressure: '120/80'
      }
    },
    {
      name: 'Rahul Sharma',
      email: 'rahul@test.com',
      password: hashedPassword,
      phone: '9876543211',
      bloodGroup: 'A+',
      role: 'donor',
      isDonor: true,
      isAvailable: true,
      activeMode: 'donor',
      address: { street: 'Connaught Place', city: 'Delhi', state: 'Delhi', pincode: '110001' },
      location: { type: 'Point', coordinates: [77.2195, 28.6328] },
      lastDonationDate: new Date('2025-12-10'),
      donorInfo: {
        weight: 75, height: 178, gender: 'Male',
        dateOfBirth: new Date('1995-08-22'),
        donationCount: 8, totalDonations: 8,
        hemoglobinLevel: 14.2, bloodPressure: '118/76'
      }
    },
    {
      name: 'Sneha Patel',
      email: 'sneha@test.com',
      password: hashedPassword,
      phone: '9876543212',
      bloodGroup: 'B+',
      role: 'donor',
      isDonor: true,
      isAvailable: true,
      activeMode: 'donor',
      address: { street: 'Sector 18', city: 'Noida', state: 'Uttar Pradesh', pincode: '201301' },
      location: { type: 'Point', coordinates: [77.3910, 28.5706] },
      lastDonationDate: new Date('2026-01-05'),
      donorInfo: {
        weight: 58, height: 160, gender: 'Female',
        dateOfBirth: new Date('1997-03-10'),
        donationCount: 3, totalDonations: 3,
        hemoglobinLevel: 12.8, bloodPressure: '115/72'
      }
    },
    {
      name: 'Arjun Mehta',
      email: 'arjun@test.com',
      password: hashedPassword,
      phone: '9876543213',
      bloodGroup: 'AB+',
      role: 'donor',
      isDonor: true,
      isAvailable: true,
      activeMode: 'donor',
      address: { street: 'Lajpat Nagar', city: 'Delhi', state: 'Delhi', pincode: '110024' },
      location: { type: 'Point', coordinates: [77.2373, 28.5672] },
      lastDonationDate: new Date('2025-11-20'),
      donorInfo: {
        weight: 82, height: 182, gender: 'Male',
        dateOfBirth: new Date('1993-11-05'),
        donationCount: 12, totalDonations: 12,
        hemoglobinLevel: 15.0, bloodPressure: '125/82'
      }
    },
    {
      name: 'Kavita Verma',
      email: 'kavita@test.com',
      password: hashedPassword,
      phone: '9876543214',
      bloodGroup: 'O-',
      role: 'user',
      isDonor: false,
      needsBlood: true,
      activeMode: 'patient',
      address: { street: 'Dwarka Sector 10', city: 'Delhi', state: 'Delhi', pincode: '110075' },
      location: { type: 'Point', coordinates: [77.0688, 28.5921] }
    },
    {
      name: 'Amit Kumar',
      email: 'amit@test.com',
      password: hashedPassword,
      phone: '9876543215',
      bloodGroup: 'B-',
      role: 'donor',
      isDonor: true,
      isAvailable: true,
      activeMode: 'donor',
      address: { street: 'Saket', city: 'Delhi', state: 'Delhi', pincode: '110017' },
      location: { type: 'Point', coordinates: [77.2167, 28.5244] },
      lastDonationDate: new Date('2026-02-01'),
      donorInfo: {
        weight: 70, height: 175, gender: 'Male',
        dateOfBirth: new Date('1996-07-18'),
        donationCount: 6, totalDonations: 6,
        hemoglobinLevel: 14.5, bloodPressure: '122/78'
      }
    },
    {
      name: 'Neha Gupta',
      email: 'neha@test.com',
      password: hashedPassword,
      phone: '9876543216',
      bloodGroup: 'A-',
      role: 'user',
      isDonor: false,
      needsBlood: true,
      activeMode: 'patient',
      address: { street: 'Vasant Kunj', city: 'Delhi', state: 'Delhi', pincode: '110070' },
      location: { type: 'Point', coordinates: [77.1565, 28.5198] }
    },
    {
      name: 'Vikram Singh',
      email: 'vikram@test.com',
      password: hashedPassword,
      phone: '9876543217',
      bloodGroup: 'AB-',
      role: 'donor',
      isDonor: true,
      isAvailable: false,
      activeMode: 'donor',
      address: { street: 'Rohini Sector 7', city: 'Delhi', state: 'Delhi', pincode: '110085' },
      location: { type: 'Point', coordinates: [77.1025, 28.7354] },
      donorInfo: {
        weight: 78, height: 180, gender: 'Male',
        dateOfBirth: new Date('1992-01-25'),
        donationCount: 15, totalDonations: 15,
        hemoglobinLevel: 14.8, bloodPressure: '120/80'
      }
    },
    {
      name: 'Riya Kapoor',
      email: 'riya@test.com',
      password: hashedPassword,
      phone: '9876543218',
      bloodGroup: 'O+',
      role: 'donor',
      isDonor: true,
      isAvailable: true,
      activeMode: 'donor',
      address: { street: 'Indirapuram', city: 'Ghaziabad', state: 'Uttar Pradesh', pincode: '201014' },
      location: { type: 'Point', coordinates: [77.3578, 28.6416] },
      lastDonationDate: new Date('2025-10-15'),
      donorInfo: {
        weight: 55, height: 158, gender: 'Female',
        dateOfBirth: new Date('1999-09-30'),
        donationCount: 2, totalDonations: 2,
        hemoglobinLevel: 12.5, bloodPressure: '110/70'
      }
    },
    {
      name: 'Deepak Joshi',
      email: 'deepak@test.com',
      password: hashedPassword,
      phone: '9876543219',
      bloodGroup: 'A+',
      role: 'donor',
      isDonor: true,
      isAvailable: true,
      activeMode: 'donor',
      address: { street: 'Greater Kailash', city: 'Delhi', state: 'Delhi', pincode: '110048' },
      location: { type: 'Point', coordinates: [77.2431, 28.5483] },
      lastDonationDate: new Date('2026-01-20'),
      donorInfo: {
        weight: 68, height: 172, gender: 'Male',
        dateOfBirth: new Date('1994-04-12'),
        donationCount: 10, totalDonations: 10,
        hemoglobinLevel: 14.0, bloodPressure: '116/74'
      }
    }
  ]);
  console.log(`Created ${users.length} users`);

  // ============ BLOOD BANKS ============
  const bloodBankData = [
    {
      name: 'Red Cross Blood Bank Delhi',
      email: 'redcross@bloodbank.com',
      password: 'Test@1234',
      phone: '011-23456789',
      licenseNumber: 'BB-DL-001',
      registrationNumber: 'REG-2020-001',
      establishedYear: 1985,
      address: { street: '1, Red Cross Road', city: 'Delhi', state: 'Delhi', pincode: '110001' },
      location: { type: 'Point', coordinates: [77.2090, 28.6353] },
      inventory: [
        { bloodGroup: 'A+', units: 45 }, { bloodGroup: 'A-', units: 12 },
        { bloodGroup: 'B+', units: 38 }, { bloodGroup: 'B-', units: 8 },
        { bloodGroup: 'AB+', units: 15 }, { bloodGroup: 'AB-', units: 5 },
        { bloodGroup: 'O+', units: 52 }, { bloodGroup: 'O-', units: 10 }
      ],
      operatingHours: { open: '08:00', close: '20:00', days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'] },
      services: ['Whole Blood', 'Platelets', 'Plasma', 'Red Blood Cells'],
      contactPerson: { name: 'Dr. Anil Kumar', phone: '9811111111', email: 'anil@redcross.org' },
      isActive: true,
      isVerified: true
    },
    {
      name: 'AIIMS Blood Centre',
      email: 'aiims@bloodbank.com',
      password: 'Test@1234',
      phone: '011-26593000',
      licenseNumber: 'BB-DL-002',
      registrationNumber: 'REG-2018-002',
      establishedYear: 1956,
      address: { street: 'Ansari Nagar East', city: 'Delhi', state: 'Delhi', pincode: '110029' },
      location: { type: 'Point', coordinates: [77.2100, 28.5672] },
      inventory: [
        { bloodGroup: 'A+', units: 80 }, { bloodGroup: 'A-', units: 25 },
        { bloodGroup: 'B+', units: 65 }, { bloodGroup: 'B-', units: 18 },
        { bloodGroup: 'AB+', units: 30 }, { bloodGroup: 'AB-', units: 10 },
        { bloodGroup: 'O+', units: 95 }, { bloodGroup: 'O-', units: 22 }
      ],
      operatingHours: { open: '00:00', close: '23:59', days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] },
      services: ['Whole Blood', 'Platelets', 'Plasma', 'Red Blood Cells', 'Cryoprecipitate'],
      contactPerson: { name: 'Dr. Meera Jain', phone: '9811222222', email: 'meera@aiims.edu' },
      isActive: true,
      isVerified: true
    },
    {
      name: 'Safdarjung Hospital Blood Bank',
      email: 'safdarjung@bloodbank.com',
      password: 'Test@1234',
      phone: '011-26707437',
      licenseNumber: 'BB-DL-003',
      registrationNumber: 'REG-2019-003',
      establishedYear: 1954,
      address: { street: 'Ring Road', city: 'Delhi', state: 'Delhi', pincode: '110029' },
      location: { type: 'Point', coordinates: [77.2069, 28.5682] },
      inventory: [
        { bloodGroup: 'A+', units: 35 }, { bloodGroup: 'A-', units: 10 },
        { bloodGroup: 'B+', units: 28 }, { bloodGroup: 'B-', units: 7 },
        { bloodGroup: 'AB+', units: 12 }, { bloodGroup: 'AB-', units: 3 },
        { bloodGroup: 'O+', units: 40 }, { bloodGroup: 'O-', units: 8 }
      ],
      operatingHours: { open: '09:00', close: '17:00', days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'] },
      services: ['Whole Blood', 'Platelets', 'Plasma'],
      contactPerson: { name: 'Dr. Rajesh Gupta', phone: '9811333333', email: 'rajesh@safdarjung.org' },
      isActive: true,
      isVerified: true
    },
    {
      name: 'Rotary Blood Bank',
      email: 'rotary@bloodbank.com',
      password: 'Test@1234',
      phone: '011-47474747',
      licenseNumber: 'BB-DL-004',
      registrationNumber: 'REG-2015-004',
      establishedYear: 2002,
      address: { street: 'Tughlakabad Institutional Area', city: 'Delhi', state: 'Delhi', pincode: '110062' },
      location: { type: 'Point', coordinates: [77.2560, 28.5141] },
      inventory: [
        { bloodGroup: 'A+', units: 55 }, { bloodGroup: 'A-', units: 15 },
        { bloodGroup: 'B+', units: 42 }, { bloodGroup: 'B-', units: 11 },
        { bloodGroup: 'AB+', units: 20 }, { bloodGroup: 'AB-', units: 6 },
        { bloodGroup: 'O+', units: 60 }, { bloodGroup: 'O-', units: 14 }
      ],
      operatingHours: { open: '08:00', close: '22:00', days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] },
      services: ['Whole Blood', 'Platelets', 'Plasma', 'Red Blood Cells', 'Apheresis'],
      contactPerson: { name: 'Dr. Sanjay Bhatia', phone: '9811444444', email: 'sanjay@rotary.org' },
      isActive: true,
      isVerified: true
    },
    {
      name: 'Apollo Blood Bank',
      email: 'apollo@bloodbank.com',
      password: 'Test@1234',
      phone: '011-29871000',
      licenseNumber: 'BB-DL-005',
      registrationNumber: 'REG-2016-005',
      establishedYear: 1996,
      address: { street: 'Sarita Vihar', city: 'Delhi', state: 'Delhi', pincode: '110076' },
      location: { type: 'Point', coordinates: [77.2885, 28.5380] },
      inventory: [
        { bloodGroup: 'A+', units: 70 }, { bloodGroup: 'A-', units: 20 },
        { bloodGroup: 'B+', units: 55 }, { bloodGroup: 'B-', units: 14 },
        { bloodGroup: 'AB+', units: 25 }, { bloodGroup: 'AB-', units: 8 },
        { bloodGroup: 'O+', units: 75 }, { bloodGroup: 'O-', units: 18 }
      ],
      operatingHours: { open: '00:00', close: '23:59', days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] },
      services: ['Whole Blood', 'Platelets', 'Plasma', 'Red Blood Cells', 'Cryoprecipitate', 'Leukoreduced Blood'],
      contactPerson: { name: 'Dr. Priya Saxena', phone: '9811555555', email: 'priya@apollo.com' },
      isActive: true,
      isVerified: true
    }
  ];
  // Use save() instead of insertMany so pre-save password hashing hook runs
  const bloodBanks = [];
  for (const data of bloodBankData) {
    const bb = new BloodBank(data);
    await bb.save();
    bloodBanks.push(bb);
  }
  console.log(`Created ${bloodBanks.length} blood banks`);

  // ============ INVENTORY (separate collection) ============
  const inventories = await Inventory.insertMany(bloodBanks.map(bb => ({
    bloodBank: bb._id,
    bloodBankName: bb.name,
    items: bb.inventory.map(inv => ({
      bloodGroup: inv.bloodGroup,
      units: inv.units,
      lastUpdated: new Date()
    }))
  })));
  console.log(`Created ${inventories.length} inventory records`);

  // ============ BLOOD REQUESTS ============
  const requests = await BloodRequest.insertMany([
    {
      requestedBy: users[4]._id, // Kavita (patient)
      patientName: 'Kavita Verma',
      bloodGroup: 'O-',
      units: 2,
      urgency: 'critical',
      hospital: { name: 'AIIMS Hospital', address: 'Ansari Nagar East, Delhi', location: { type: 'Point', coordinates: [77.2100, 28.5672] } },
      contactNumber: '9876543214',
      requiredBy: new Date('2026-02-25'),
      status: 'pending',
      description: 'Emergency surgery - need O- blood urgently',
      bloodBank: bloodBanks[1]._id
    },
    {
      requestedBy: users[6]._id, // Neha (patient)
      patientName: 'Neha Gupta',
      bloodGroup: 'A-',
      units: 3,
      urgency: 'urgent',
      hospital: { name: 'Safdarjung Hospital', address: 'Ring Road, Delhi', location: { type: 'Point', coordinates: [77.2069, 28.5682] } },
      contactNumber: '9876543216',
      requiredBy: new Date('2026-02-28'),
      status: 'approved',
      description: 'Post-accident transfusion required',
      bloodBank: bloodBanks[2]._id,
      bloodBankResponse: { status: 'approved', respondedAt: new Date('2026-02-22'), respondedBy: bloodBanks[2]._id, responseNote: 'Approved. Please visit with patient ID.' }
    },
    {
      requestedBy: users[4]._id, // Kavita
      patientName: 'Ramesh Verma',
      bloodGroup: 'B+',
      units: 1,
      urgency: 'normal',
      hospital: { name: 'Apollo Hospital', address: 'Sarita Vihar, Delhi', location: { type: 'Point', coordinates: [77.2885, 28.5380] } },
      contactNumber: '9876543214',
      requiredBy: new Date('2026-03-05'),
      status: 'pending',
      description: 'Scheduled surgery - blood needed for father',
      bloodBank: bloodBanks[4]._id
    },
    {
      requestedBy: users[6]._id, // Neha
      patientName: 'Sunita Gupta',
      bloodGroup: 'AB+',
      units: 2,
      urgency: 'urgent',
      hospital: { name: 'Red Cross Hospital', address: 'Red Cross Road, Delhi', location: { type: 'Point', coordinates: [77.2090, 28.6353] } },
      contactNumber: '9876543216',
      requiredBy: new Date('2026-02-26'),
      status: 'fulfilled',
      description: 'Transfusion for mother - thalassemia treatment',
      bloodBank: bloodBanks[0]._id,
      bloodBankResponse: { status: 'approved', respondedAt: new Date('2026-02-20'), respondedBy: bloodBanks[0]._id, responseNote: 'Fulfilled successfully.' }
    },
    {
      requestedBy: users[0]._id, // Prachi (admin)
      patientName: 'Mohit Tiwari',
      bloodGroup: 'O+',
      units: 4,
      urgency: 'critical',
      hospital: { name: 'Rotary Hospital', address: 'Tughlakabad, Delhi', location: { type: 'Point', coordinates: [77.2560, 28.5141] } },
      contactNumber: '9876543210',
      requiredBy: new Date('2026-02-24'),
      status: 'pending',
      description: 'Major road accident victim - multiple units needed',
      bloodBank: bloodBanks[3]._id
    }
  ]);
  console.log(`Created ${requests.length} blood requests`);

  // ============ BLOOD CAMPS ============
  const camps = await BloodCamp.insertMany([
    {
      name: 'Delhi University Mega Blood Donation Camp',
      organizer: bloodBanks[0]._id,
      organizerName: 'Red Cross Blood Bank Delhi',
      date: new Date('2026-03-01'),
      startTime: '09:00',
      endTime: '17:00',
      venue: 'Delhi University North Campus',
      address: 'University Road, North Campus',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110007',
      location: { type: 'Point', coordinates: [77.2117, 28.6869] },
      targetUnits: 200,
      collectedUnits: 0,
      description: 'Annual mega blood donation drive organized in collaboration with NSS. Free health checkup for all donors!',
      contactPhone: '9811111111',
      contactEmail: 'camp@redcross.org',
      status: 'upcoming',
      registeredDonors: [
        { donor: users[1]._id, name: 'Rahul Sharma', phone: '9876543211', bloodGroup: 'A+' },
        { donor: users[2]._id, name: 'Sneha Patel', phone: '9876543212', bloodGroup: 'B+' },
        { donor: users[3]._id, name: 'Arjun Mehta', phone: '9876543213', bloodGroup: 'AB+' }
      ]
    },
    {
      name: 'Corporate Blood Donation Drive - Cyber City',
      organizer: bloodBanks[3]._id,
      organizerName: 'Rotary Blood Bank',
      date: new Date('2026-03-10'),
      startTime: '10:00',
      endTime: '16:00',
      venue: 'DLF Cyber Hub',
      address: 'DLF Cyber City, Phase 2',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002',
      location: { type: 'Point', coordinates: [77.0889, 28.4944] },
      targetUnits: 150,
      collectedUnits: 0,
      description: 'Blood donation camp for corporate employees. Refreshments and certificates provided.',
      contactPhone: '9811444444',
      contactEmail: 'camp@rotary.org',
      status: 'scheduled',
      registeredDonors: [
        { donor: users[5]._id, name: 'Amit Kumar', phone: '9876543215', bloodGroup: 'B-' },
        { donor: users[8]._id, name: 'Riya Kapoor', phone: '9876543218', bloodGroup: 'O+' }
      ]
    },
    {
      name: 'World Blood Donor Day Camp',
      organizer: bloodBanks[1]._id,
      organizerName: 'AIIMS Blood Centre',
      date: new Date('2026-02-15'),
      startTime: '08:00',
      endTime: '18:00',
      venue: 'AIIMS Convention Centre',
      address: 'Ansari Nagar East',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110029',
      location: { type: 'Point', coordinates: [77.2100, 28.5672] },
      targetUnits: 300,
      collectedUnits: 245,
      description: 'Special blood donation camp on World Blood Donor Day. Record-breaking participation!',
      contactPhone: '9811222222',
      contactEmail: 'camp@aiims.edu',
      status: 'completed',
      registeredDonors: [
        { donor: users[1]._id, name: 'Rahul Sharma', phone: '9876543211', bloodGroup: 'A+', attended: true },
        { donor: users[3]._id, name: 'Arjun Mehta', phone: '9876543213', bloodGroup: 'AB+', attended: true },
        { donor: users[5]._id, name: 'Amit Kumar', phone: '9876543215', bloodGroup: 'B-', attended: true },
        { donor: users[9]._id, name: 'Deepak Joshi', phone: '9876543219', bloodGroup: 'A+', attended: true }
      ]
    }
  ]);
  console.log(`Created ${camps.length} blood camps`);

  // ============ EVENTS ============
  const events = await Event.insertMany([
    {
      title: 'Blood Donation Awareness Walk',
      description: 'Join us for a 5km awareness walk to spread the message about voluntary blood donation. Free t-shirts and refreshments for all participants!',
      organizer: 'Red Cross Society',
      organizedBy: users[0]._id,
      organizerModel: 'User',
      eventType: 'awareness',
      location: { name: 'India Gate', address: 'Rajpath, Delhi 110001' },
      date: new Date('2026-03-05'),
      startTime: '07:00',
      endTime: '10:00',
      contactInfo: { phone: '9876543210', email: 'prachi@test.com' },
      expectedDonors: 500,
      registeredDonors: [users[1]._id, users[2]._id, users[3]._id, users[5]._id],
      isActive: true,
      visibility: 'public',
      maxParticipants: 500
    },
    {
      title: 'Free Health Checkup & Blood Donation Camp',
      description: 'Get a complete health checkup including blood pressure, sugar, and hemoglobin levels. Eligible donors can donate blood and receive a certificate.',
      organizer: 'Apollo Hospital',
      eventType: 'health-checkup',
      location: { name: 'Apollo Hospital', address: 'Sarita Vihar, Delhi 110076' },
      date: new Date('2026-03-15'),
      startTime: '09:00',
      endTime: '15:00',
      contactInfo: { phone: '9811555555', email: 'events@apollo.com' },
      expectedDonors: 100,
      registeredDonors: [users[8]._id, users[9]._id],
      isActive: true,
      visibility: 'public',
      maxParticipants: 150
    },
    {
      title: 'Emergency Blood Drive - Accident Victims',
      description: 'Urgent blood drive to replenish stock after a major highway accident. All blood groups needed especially O- and O+.',
      organizer: 'Safdarjung Hospital',
      eventType: 'blood-drive',
      location: { name: 'Safdarjung Hospital', address: 'Ring Road, Delhi 110029' },
      date: new Date('2026-02-23'),
      startTime: '06:00',
      endTime: '20:00',
      contactInfo: { phone: '9811333333', email: 'emergency@safdarjung.org' },
      expectedDonors: 200,
      registeredDonors: [users[1]._id, users[3]._id, users[5]._id, users[7]._id, users[8]._id, users[9]._id],
      isActive: true,
      visibility: 'public',
      maxParticipants: 300
    },
    {
      title: 'Donor Appreciation Day',
      description: 'Celebrating our regular donors! Special felicitation ceremony for donors with 10+ donations. Refreshments and awards.',
      organizer: 'Rotary Blood Bank',
      eventType: 'awareness',
      location: { name: 'Rotary Blood Bank', address: 'Tughlakabad, Delhi 110062' },
      date: new Date('2026-03-20'),
      startTime: '16:00',
      endTime: '20:00',
      contactInfo: { phone: '9811444444', email: 'events@rotary.org' },
      expectedDonors: 50,
      registeredDonors: [users[3]._id, users[7]._id, users[9]._id],
      isActive: true,
      visibility: 'donors-only',
      maxParticipants: 100
    }
  ]);
  console.log(`Created ${events.length} events`);

  console.log('\n========================================');
  console.log('  SEED DATA COMPLETE!');
  console.log('========================================');
  console.log('\nTest Login Credentials:');
  console.log('  Admin:  prachi@test.com / Test@1234');
  console.log('  Donor:  rahul@test.com / Test@1234');
  console.log('  Patient: kavita@test.com / Test@1234');
  console.log('\nAll users password: Test@1234');
  console.log(`\nSummary:`);
  console.log(`  Users: ${users.length}`);
  console.log(`  Blood Banks: ${bloodBanks.length}`);
  console.log(`  Inventories: ${inventories.length}`);
  console.log(`  Blood Requests: ${requests.length}`);
  console.log(`  Blood Camps: ${camps.length}`);
  console.log(`  Events: ${events.length}`);
  console.log('========================================\n');

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
