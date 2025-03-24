import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(MONGO_URI);

const books = [
  // Civil Engineering Books
  { title: "Principles of Geotechnical Engineering", author: "Braja M. Das", category: "Civil", image: "https://m.media-amazon.com/images/I/51qj5ThZcFL.jpg" },
  { title: "Structural Analysis", author: "R.C. Hibbeler", category: "Civil", image: "https://m.media-amazon.com/images/I/51dyNfRRPzL.jpg" },
  { title: "Civil Engineering Materials", author: "Shah & Karve", category: "Civil", image: "https://m.media-amazon.com/images/I/71P2TjlZP0L.jpg" },
  { title: "Mechanics of Materials", author: "R.C. Hibbeler", category: "Civil", image: "https://m.media-amazon.com/images/I/81m9eJDShYL.jpg" },
  { title: "Design of Reinforced Concrete", author: "Jack C. McCormac", category: "Civil", image: "https://m.media-amazon.com/images/I/91pQ7eUJ1DL.jpg" },
  { title: "Transportation Engineering", author: "C. Jotin Khisty", category: "Civil", image: "https://m.media-amazon.com/images/I/61Hn7wxYqAL.jpg" },
  { title: "Surveying: Principles and Applications", author: "Barry F. Kavanagh", category: "Civil", image: "https://m.media-amazon.com/images/I/71c0RGDgURL.jpg" },
  { title: "Concrete Technology", author: "M. L. Gambhir", category: "Civil", image: "https://m.media-amazon.com/images/I/61o59eC65cL.jpg" },

  // Mechanical Engineering Books
  { title: "Engineering Thermodynamics", author: "P.K. Nag", category: "Mechanical", image: "https://m.media-amazon.com/images/I/51aIwxUNdiL.jpg" },
  { title: "Fluid Mechanics", author: "Frank White", category: "Mechanical", image: "https://m.media-amazon.com/images/I/61l3HKlXQpL.jpg" },
  { title: "Machine Design", author: "Robert L. Norton", category: "Mechanical", image: "https://m.media-amazon.com/images/I/81ZjZUP+xjL.jpg" },
  { title: "Manufacturing Engineering & Technology", author: "Serope Kalpakjian", category: "Mechanical", image: "https://m.media-amazon.com/images/I/91SzZZ8PV6L.jpg" },
  { title: "Internal Combustion Engines", author: "V. Ganesan", category: "Mechanical", image: "https://m.media-amazon.com/images/I/51dcXlqQphL.jpg" },
  { title: "Dynamics of Machinery", author: "A. Ghosh", category: "Mechanical", image: "https://m.media-amazon.com/images/I/51F5qLe6REL.jpg" },
  { title: "Heat and Mass Transfer", author: "J.P. Holman", category: "Mechanical", image: "https://m.media-amazon.com/images/I/81JdFZjJIfL.jpg" },
  { title: "Engineering Drawing", author: "N.D. Bhatt", category: "Mechanical", image: "https://m.media-amazon.com/images/I/71lJHOuDq6L.jpg" },

  // Computer Science Books
  { title: "Introduction to the Theory of Computation", author: "Michael Sipser", category: "Computer Science", image: "https://m.media-amazon.com/images/I/51RGAh8QJFL.jpg" },
  { title: "Operating System Concepts", author: "Abraham Silberschatz", category: "Computer Science", image: "https://m.media-amazon.com/images/I/81mXVkg9oCL.jpg" },
  { title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell", category: "Computer Science", image: "https://m.media-amazon.com/images/I/71NJMcMFNHL.jpg" },
  { title: "Computer Networks", author: "Andrew S. Tanenbaum", category: "Computer Science", image: "https://m.media-amazon.com/images/I/81tb5ldjvTL.jpg" },
  { title: "Database System Concepts", author: "Henry F. Korth", category: "Computer Science", image: "https://m.media-amazon.com/images/I/71t8ec6WJvL.jpg" },
  { title: "Data Structures and Algorithms", author: "Thomas H. Cormen", category: "Computer Science", image: "https://m.media-amazon.com/images/I/81M6VqFwhXL.jpg" },
  { title: "Modern Operating Systems", author: "Andrew S. Tanenbaum", category: "Computer Science", image: "https://m.media-amazon.com/images/I/81V2Pz1B1zL.jpg" },
  { title: "Computer Organization and Design", author: "David A. Patterson", category: "Computer Science", image: "https://m.media-amazon.com/images/I/71RtJsnP1XL.jpg" },

  { title: "Electronic Devices and Circuit Theory", author: "Robert L. Boylestad", category: "Electronics", image: "https://m.media-amazon.com/images/I/81DqPi4r5VL.jpg" },
  { title: "Microelectronic Circuits", author: "Adel S. Sedra", category: "Electronics", image: "https://m.media-amazon.com/images/I/81P+9bhprcL.jpg" },
  { title: "Digital Design", author: "M. Morris Mano", category: "Electronics", image: "https://m.media-amazon.com/images/I/71e9S9-VToL.jpg" },
  { title: "Analog and Digital Communication", author: "Simon Haykin", category: "Electronics", image: "https://m.media-amazon.com/images/I/71ICGRuycsL.jpg" },
  { title: "Embedded Systems: Real-Time Interfacing", author: "Jonathan Valvano", category: "Electronics", image: "https://m.media-amazon.com/images/I/81lXKAKOhJL.jpg" },
  { title: "Power Electronics", author: "Muhammad H. Rashid", category: "Electronics", image: "https://m.media-amazon.com/images/I/81is2eodRTL.jpg" },
  { title: "Electronic Instrumentation", author: "H.S. Kalsi", category: "Electronics", image: "https://m.media-amazon.com/images/I/71e1a6pum5L.jpg" },
  { title: "VLSI Design", author: "Wayne Wolf", category: "Electronics", image: "https://m.media-amazon.com/images/I/71p6QujjQ-L.jpg" },

  // Metallurgy Engineering Books
  { title: "Physical Metallurgy", author: "William F. Hosford", category: "Metallurgy", image: "https://m.media-amazon.com/images/I/71cA+0xv8wL.jpg" },
  { title: "Introduction to Materials Science", author: "William D. Callister", category: "Metallurgy", image: "https://m.media-amazon.com/images/I/71J9AHgsaTL.jpg" },
  { title: "Mechanical Metallurgy", author: "George E. Dieter", category: "Metallurgy", image: "https://m.media-amazon.com/images/I/71T3j7IEVwL.jpg" },
  { title: "Extractive Metallurgy", author: "Fathi Habashi", category: "Metallurgy", image: "https://m.media-amazon.com/images/I/81uB0kQ0AsL.jpg" },
  { title: "Steel Metallurgy", author: "John D. Verhoeven", category: "Metallurgy", image: "https://m.media-amazon.com/images/I/71UuAPvvVFL.jpg" },
  { title: "Welding Metallurgy", author: "Sindo Kou", category: "Metallurgy", image: "https://m.media-amazon.com/images/I/71Vt5cs+R1L.jpg" },
  { title: "Corrosion Engineering", author: "Mars G. Fontana", category: "Metallurgy", image: "https://m.media-amazon.com/images/I/81zQZZIH5vL.jpg" },
  { title: "Materials Selection in Mechanical Design", author: "Michael F. Ashby", category: "Metallurgy", image: "https://m.media-amazon.com/images/I/81m2wA2QoML.jpg" },

  // Textile Engineering Books
  { title: "Textile Manufacturing Processes", author: "A. R. Horrocks", category: "Textile", image: "https://m.media-amazon.com/images/I/71xGHLQlTQL.jpg" },
  { title: "Principles of Textile Testing", author: "J.E. Booth", category: "Textile", image: "https://m.media-amazon.com/images/I/71aiYIxYg6L.jpg" },
  { title: "Textile Fibers", author: "V.K. Kothari", category: "Textile", image: "https://m.media-amazon.com/images/I/61Bj3MPw5vL.jpg" },
  { title: "Weaving: Conversion of Yarn to Fabric", author: "P. R. Lord", category: "Textile", image: "https://m.media-amazon.com/images/I/71ozkEK8hzL.jpg" },
  { title: "Knitting Technology", author: "D.J. Spencer", category: "Textile", image: "https://m.media-amazon.com/images/I/719lBQNyFuL.jpg" },
  { title: "Dyeing and Chemical Technology of Textile Fibers", author: "Charles M. Roach", category: "Textile", image: "https://m.media-amazon.com/images/I/71RyoXEj5oL.jpg" },
  { title: "Nonwoven Fabrics", author: "Wilhelm Albrecht", category: "Textile", image: "https://m.media-amazon.com/images/I/71HT4voSLtL.jpg" },
  { title: "Fundamentals of Spun Yarn Technology", author: "Carl A. Lawrence", category: "Textile", image: "https://m.media-amazon.com/images/I/719Km9OapPL.jpg" },

  { title: "Automobile Engineering", author: "Kirpal Singh", category: "Automobile", image: "https://m.media-amazon.com/images/I/81Jtd2P-GuL.jpg" },
  { title: "Internal Combustion Engines", author: "V. Ganesan", category: "Automobile", image: "https://m.media-amazon.com/images/I/71ve0og35dL.jpg" },
  { title: "Vehicle Dynamics", author: "Reza N. Jazar", category: "Automobile", image: "https://m.media-amazon.com/images/I/71l3uo3KPPL.jpg" },
  { title: "Automotive Chassis Systems", author: "James D. Halderman", category: "Automobile", image: "https://m.media-amazon.com/images/I/81AeBZ5Oi4L.jpg" },
  { title: "Automotive Electrical and Electronic Systems", author: "Tom Denton", category: "Automobile", image: "https://m.media-amazon.com/images/I/71TgnpH1RXL.jpg" },
  { title: "Hybrid and Electric Vehicles", author: "Iqbal Husain", category: "Automobile", image: "https://m.media-amazon.com/images/I/81W6J7iJ5ML.jpg" },
  { title: "Fundamentals of Vehicle Dynamics", author: "Thomas D. Gillespie", category: "Automobile", image: "https://m.media-amazon.com/images/I/81fJ2Mzi3vL.jpg" },
  { title: "Advanced Engine Technology", author: "Heinz Heisler", category: "Automobile", image: "https://m.media-amazon.com/images/I/71VCgGIoMnL.jpg" },

  // Biomedical Engineering Books
  { title: "Biomedical Instrumentation and Measurements", author: "Leslie Cromwell", category: "Biomedical", image: "https://m.media-amazon.com/images/I/81FQqL69+qL.jpg" },
  { title: "Introduction to Biomedical Engineering", author: "John Enderle", category: "Biomedical", image: "https://m.media-amazon.com/images/I/71owhB-PbLL.jpg" },
  { title: "Medical Instrumentation", author: "John G. Webster", category: "Biomedical", image: "https://m.media-amazon.com/images/I/71FRQxYY3kL.jpg" },
  { title: "Biomaterials Science", author: "Buddy D. Ratner", category: "Biomedical", image: "https://m.media-amazon.com/images/I/71LSvELpqzL.jpg" },
  { title: "Biomedical Signal Processing", author: "Metin Akay", category: "Biomedical", image: "https://m.media-amazon.com/images/I/61BxrSpXxXL.jpg" },
  { title: "Biomechanics of Human Motion", author: "Emeric Arus", category: "Biomedical", image: "https://m.media-amazon.com/images/I/81D5TiC5bPL.jpg" },
  { title: "Neural Engineering", author: "Bin He", category: "Biomedical", image: "https://m.media-amazon.com/images/I/81ekP4quXcL.jpg" },
  { title: "Biomedical Optics", author: "Lihong Wang", category: "Biomedical", image: "https://m.media-amazon.com/images/I/71aVXypOqRL.jpg" },

  // Production Engineering Books
  { title: "Manufacturing Science", author: "Amitabha Ghosh", category: "Production", image: "https://m.media-amazon.com/images/I/71v5uBhRuEL.jpg" },
  { title: "Production Technology", author: "R.K. Jain", category: "Production", image: "https://m.media-amazon.com/images/I/71fsMbyuHdL.jpg" },
  { title: "Materials and Manufacturing Processes", author: "Kaushik Kumar", category: "Production", image: "https://m.media-amazon.com/images/I/71S1qAWqAoL.jpg" },
  { title: "Automation, Production Systems, and Computer-Integrated Manufacturing", author: "Mikell P. Groover", category: "Production", image: "https://m.media-amazon.com/images/I/81Fg1QKehML.jpg" },
  { title: "Quality Control and Industrial Statistics", author: "Amitava Mitra", category: "Production", image: "https://m.media-amazon.com/images/I/71MGyVzKjZL.jpg" },
  { title: "Advanced Machining Processes", author: "V.K. Jain", category: "Production", image: "https://m.media-amazon.com/images/I/71DqPmbhXtL.jpg" },
  { title: "Manufacturing Process for Engineering Materials", author: "Serope Kalpakjian", category: "Production", image: "https://m.media-amazon.com/images/I/7196hJzOKTL.jpg" },
  { title: "Lean Manufacturing", author: "William M. Feld", category: "Production", image: "https://m.media-amazon.com/images/I/71Cv63WJtdL.jpg" },

  { title: "Introduction to Robotics", author: "John J. Craig", category: "Robotics", image: "https://m.media-amazon.com/images/I/71lPqJuoWOL.jpg" },
  { title: "Robot Modeling and Control", author: "Mark W. Spong", category: "Robotics", image: "https://m.media-amazon.com/images/I/71VErKxNz9L.jpg" },
  { title: "Modern Robotics", author: "Kevin M. Lynch", category: "Robotics", image: "https://m.media-amazon.com/images/I/71YFSc9nH5L.jpg" },
  { title: "Robotics, Vision and Control", author: "Peter Corke", category: "Robotics", image: "https://m.media-amazon.com/images/I/81MD85gHtyL.jpg" },
  { title: "Artificial Intelligence for Robotics", author: "Francis X. Govers", category: "Robotics", image: "https://m.media-amazon.com/images/I/81lz2HqHCcL.jpg" },
  { title: "Introduction to Autonomous Robots", author: "Nikolaus Correll", category: "Robotics", image: "https://m.media-amazon.com/images/I/81uY4Nkp+wL.jpg" },
  { title: "Robotic Process Automation", author: "Tom Taulli", category: "Robotics", image: "https://m.media-amazon.com/images/I/81WnM6vAkTL.jpg" },
  { title: "Computational Principles of Mobile Robotics", author: "Gregory Dudek", category: "Robotics", image: "https://m.media-amazon.com/images/I/81cs7jjRPQL.jpg" },

  // Biotech Books
  { title: "Molecular Biotechnology", author: "Bernard R. Glick", category: "BioTech", image: "https://m.media-amazon.com/images/I/81owHUoRZyL.jpg" },
  { title: "Principles of Gene Manipulation", author: "Sandy Primrose", category: "BioTech", image: "https://m.media-amazon.com/images/I/71aWTOB4uzL.jpg" },
  { title: "Biotechnology: An Introduction", author: "Susan R. Barnum", category: "BioTech", image: "https://m.media-amazon.com/images/I/81cY+8xVLhL.jpg" },
  { title: "Biochemical Engineering Fundamentals", author: "James E. Bailey", category: "BioTech", image: "https://m.media-amazon.com/images/I/81JxILi7l-L.jpg" },
  { title: "Plant Biotechnology", author: "Adrian Slater", category: "BioTech", image: "https://m.media-amazon.com/images/I/81m7+EVbc8L.jpg" },
  { title: "Industrial Biotechnology", author: "Michael Flickinger", category: "BioTech", image: "https://m.media-amazon.com/images/I/71HkT0skMoL.jpg" },
  { title: "Biotechnology for Beginners", author: "Reinhard Renneberg", category: "BioTech", image: "https://m.media-amazon.com/images/I/71Q78Gi91vL.jpg" },
  { title: "Environmental Biotechnology", author: "Bruce E. Rittmann", category: "BioTech", image: "https://m.media-amazon.com/images/I/71WUMxJ47rL.jpg" },

  // Fashion Technology Books
  { title: "Fashion Design", author: "Sue Jenkyn Jones", category: "FashionTech", image: "https://m.media-amazon.com/images/I/71FTuhh+88L.jpg" },
  { title: "The Fashion System", author: "Roland Barthes", category: "FashionTech", image: "https://m.media-amazon.com/images/I/71a+eTHTzML.jpg" },
  { title: "Textile Technology", author: "R. Senthil Kumar", category: "FashionTech", image: "https://m.media-amazon.com/images/I/71oHSLP4KPL.jpg" },
  { title: "Fabric Science", author: "Arthur Price", category: "FashionTech", image: "https://m.media-amazon.com/images/I/71CsT3v51EL.jpg" },
  { title: "Introduction to Fashion Technology", author: "Pooja Khurana", category: "FashionTech", image: "https://m.media-amazon.com/images/I/81gVKhz8lYL.jpg" },
  { title: "Apparel Manufacturing", author: "R. Rathinamoorthy", category: "FashionTech", image: "https://m.media-amazon.com/images/I/81DtWxVhG4L.jpg" },
  { title: "Sustainable Fashion", author: "Jennifer Farley Gordon", category: "FashionTech", image: "https://m.media-amazon.com/images/I/71irwPRRUgL.jpg" },
  { title: "Fashion Forecasting", author: "Evelyn L. Brannon", category: "FashionTech", image: "https://m.media-amazon.com/images/I/71cDtx1oSLL.jpg" },


];

// Function to seed the database
const seedBooks = async () => {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("library-data"); // ✅ Explicitly specify the database
    const booksCollection = db.collection("books"); // ✅ Explicitly specify the collection

    await booksCollection.deleteMany(); // Clear existing books
    await booksCollection.insertMany(books); // Insert new books

    console.log("✅ Books Seeded Successfully!");
  } catch (error) {
    console.error("❌ Error Seeding Books:", error);
  } finally {
    await client.close(); // Close the database connection
  }
};

// Run the Seed Function
seedBooks();
