import { TV_GUIDE_CONFIG } from './config.js';

export class AdvertisementManager {
    constructor() {
        this.advertisements = [];
        this.currentAdIndex = 0;
        this.adTimer = null;
        this.adElement = null;
        this.isInitialized = false;
    }

    initialize() {
        this.adElement = document.getElementById('adPanel');
        if (!this.adElement) {
            console.error('Ad panel element not found');
            return;
        }
        
        this.advertisements = this.generateAdvertisementDatabase();
        this.shuffleAdvertisements();
        this.startAdRotation();
        this.isInitialized = true;
        
        console.log(`Advertisement Manager initialized with ${this.advertisements.length} ads`);
    }

    generateAdvertisementDatabase() {
        return [
            // Video Stores & Entertainment (Parodies)
            {
                title: "MEGA VIDEO EMPORIUM",
                subtitle: "ALL NEW RELEASES ON BETAMAX & LASERDISC",
                features: "Tapes • Game Cartridges • Rental Robots • Popcorn Bar",
                special: "REWIND OR PAY $2.99 FEE!",
                phone: "Store Locator: 1-888-RENT-VID",
                tagline: "Your Weekend Entertainment Headquarters",
                price: "5 MOVIES $19.99",
                disclaimer: "*Late fees apply after 3 days",

                theme: "video-store"
            },
            {
                title: "BLOCKBLASTER VIDEO",
                subtitle: "BE KIND, REWIND... OR ELSE",
                features: "New Releases • Guaranteed In Stock* • Stale Candy",
                special: "LATE FEES ARE OUR SPECIALTY!",
                phone: "Find Your Store: 1-800-BUST-ER1",
                tagline: "Make it a Blockblaster Night (If You Dare)",
                price: "3 NIGHTS $9.99",
                disclaimer: "*Guarantee void on weekends, holidays, and Tuesdays",

                theme: "blockbuster"
            },
            {
                title: "BOLLYWOOD VIDEO",
                subtitle: "GUARANTEED IN STOCK OR WE'LL ARGUE",
                features: "DVD • VHS • PlayStation Games • Director's Cuts & Director's Egos",
                special: "MOVIE PASS: UNLIMITED ARGUMENTS!",
                phone: "Complaint Hotline: 1-888-HOLLY-WOOD",
                tagline: "Movies That Don't Really Matter",
                price: "ONLY $29.99/MONTH",
                disclaimer: "*New releases cost extra soul",

                theme: "hollywood"
            },

            // Electronics & Technology (Parodies)
            {
                title: "CIRCUIT CIRCUS",
                subtitle: "WHERE SERVICE IS A WILD RIDE",
                features: "27\" TVs • VHS Players • Nintendo 63 • Digital Cameras That Don't Work",
                special: "90 DAYS SAME AS CHAOS!",
                phone: "Customer Confusion: 1-800-THE-CLOWN",
                tagline: "We're With You Every Step... Then We Vanish",
                price: "TVS FROM $299*",
                disclaimer: "*Assembly required. Batteries not included. Sanity sold separately.",

                theme: "electronics"
            },
            {
                title: "RADIO SHARK",
                subtitle: "YOU'VE GOT QUESTIONS. WE'VE GOT SHRUGS.",
                features: "Dead Batteries • Cell Phones From 1987 • Adapters for Things That Don't Exist",
                special: "FREE BATTERY CLUB! (BATTERIES SOLD SEPARATELY)",
                phone: "Tech Support: 1-800-THE-SHARK",
                tagline: "The Technology Store (For Yesterday's Technology)",
                price: "PHONES FROM $99*",
                disclaimer: "*Requires blood sacrifice and 27-year service agreement",

                theme: "radio-shack"
            },
            {
                title: "WORST BUY",
                subtitle: "TURN OFF THE FUN",
                features: "Computers That Crash • CD Players • Pagers • Home Theater (Some Assembly Required)",
                special: "PRICE MATCH GUARANTEE! (WE'LL MATCH ANY PRICE FROM 1995)",
                phone: "Store Locator: 1-888-WORST-BUY",
                tagline: "Making Technology Confusing For You",
                price: "PCS FROM $799*",
                disclaimer: "*Windows 95 not included. Requires PhD in Computer Science.",

                theme: "best-buy"
            },

            // Fast Food & Restaurants (Parodies)
            {
                title: "McDONKEY'S",
                subtitle: "I'M TOLERATIN' IT",
                features: "Big Muck • Unhappy Meals • McFlurry of Confusion • Drive-Thru of Regret",
                special: "2 FOR $3 BIG MISTAKE ATTACK!",
                phone: "Drive-Thru Sometimes Open",
                tagline: "Over 99 Billion Served (Quality Not Guaranteed)",
                price: "VALUE MEALS $3.99*",
                disclaimer: "*Actual value may vary. Side effects include existential dread.",

                theme: "mcdonalds"
            },
            {
                title: "TACO HELL",
                subtitle: "THINK OUTSIDE THE BATHROOM",
                features: "Chalupas of Doom • Quesadillas • Fourth Meal (At Your Own Risk)",
                special: "59CENTS TACOS OF MYSTERY MEAT!",
                phone: "Find a Location: 1-800-TACO-HELL",
                tagline: "Yo Quiero Antacids",
                price: "COMBO MEALS $4.99*",
                disclaimer: "*Valid until midnight or first stomach rumble, whichever comes first.",

                theme: "taco-bell"
            },
            {
                title: "PIZZA HOVEL",
                subtitle: "MAKIN' IT MEDIOCRE",
                features: "Stuffed Crust (With What?) • Personal Pan • Breadsticks • Warm Cola",
                special: "LARGE 3-TOPPING ONLY $9.99! (TOPPINGS NOT INCLUDED)",
                phone: "Delivery Maybe: 1-800-PIZZA-HOVEL",
                tagline: "The Okayest Pizzas Under One Roof",
                price: "FREE DELIVERY*",
                disclaimer: "*Delivery charge $15.99. Deep dish requires mortgage approval.",

                theme: "pizza-hut"
            },

            // Department Stores (Parodies)
            {
                title: "WAL★MARK",
                subtitle: "ALWAYS LOW QUALITY. ALWAYS.",
                features: "Groceries of Questionable Origin • Clothing • Electronics That Might Work",
                special: "ROLLBACK PRICES TO THE STONE AGE!",
                phone: "Store Hours: 1-800-WAL-MARK",
                tagline: "We Sell for Less (And You Get Less)",
                price: "SAVE UP TO 50%*",
                disclaimer: "*Savings calculated using advanced mathematics and wishful thinking",

                theme: "walmart"
            },
            {
                title: "K-FART",
                subtitle: "THE STUFF OF NIGHTMARES",
                features: "Blue Light Specials That Blind You • Layaway Forever • Auto Center of Doom",
                special: "BLUE LIGHT SPECIAL: EVERYTHING MUST GO!",
                phone: "Customer Service: 1-800-K-FART",
                tagline: "Right Here, Right Now, Right Terrible",
                price: "CLEARANCE 70% OFF*",
                disclaimer: "*Original prices inflated 200% for your convenience.",

                theme: "kmart"
            },
            {
                title: "BULLSEYE",
                subtitle: "EXPECT LESS. PAY MORE.",
                features: "Designer Collections (By Designer Steve) • Pharmacy • Café • Photo Lab That Eats Your Film",
                special: "CIRCLE WEEK: GOING IN CIRCLES!",
                phone: "Guest Services: 1-800-BULLSEYE",
                tagline: "Good Stuff Expensive",
                price: "BUY 2 GET 1 BROKEN",
                disclaimer: "*Free item may not function as intended or at all.",

                theme: "target"
            },

            // Telecommunications (Parodies)
            {
                title: "AT&AT",
                subtitle: "REACH OUT AND ANNOY SOMEONE",
                features: "Long Distance • Calling Cards That Don't Work • Internet From 1995",
                special: "NIGHTS & WEEKENDS FREE! (DAYS COST YOUR SOUL)",
                phone: "Sign Up: 1-800-CALL-AT-AT",
                tagline: "Your Only Choice (Whether You Like It Or Not)",
                price: "10CENTS/MINUTE*",
                disclaimer: "*Plus connection fees, breathing fees, and existential crisis surcharge.",

                theme: "att"
            },
            {
                title: "SPRINT TO NOWHERE",
                subtitle: "THE UNCLEAR ALTERNATIVE TO COMMUNICATION",
                features: "PCS • Digital Static • Nationwide Coverage Holes",
                special: "FREE NIGHTS AFTER 7PM! (IF STARS ALIGN)",
                phone: "Activation: 1-800-SPRINT-NOWHERE",
                tagline: "Least Dependable Network",
                price: "$19.99/MONTH*",
                disclaimer: "*Plus activation fee, deactivation fee, and monthly 'because we can' fee.",

                theme: "sprint"
            },

            // Software & Internet (Parodies)
            {
                title: "AMERICA ON-WHINE",
                subtitle: "SO HARD TO USE, NO WONDER WE'RE LAST",
                features: "Email That Sometimes Works • Chat Rooms Full of Weirdos • Web Crawling",
                special: "1000 FREE HOURS! (OF FRUSTRATION)",
                phone: "Sign Up: 1-800-AOL-UNEASY",
                tagline: "Bringing the Internet to No One",
                price: "$21.95/MONTH*",
                disclaimer: "*After free trial of endless pain. Local access numbers sold separately.",

                theme: "aol"
            },
            {
                title: "MACROHARD",
                subtitle: "WHERE DO YOU WANT TO CRASH TODAY?",
                features: "Windows 98 (Crashes Included) • Office 2000 • Internet Exploder • Solitaire",
                special: "UPGRADE FOR ONLY $89! (DOWNGRADES INCLUDED FREE)",
                phone: "Tech Support: 1-800-MACROHARD",
                tagline: "Empowering People Through Frustration",
                price: "OFFICE 2000 $399*",
                disclaimer: "*Upgrade pricing includes complimentary nervous breakdown",

                theme: "microsoft"
            },

            // Automotive (Parodies)
            {
                title: "FJORD",
                subtitle: "HAVE YOU DRIVEN A FJORD INTO A DITCH?",
                features: "F-150 (Some Assembly Required) • Mustang • Exploder • Taurus Rex",
                special: "0% APR FINANCING! (200% AFTER FIRST MONTH)",
                phone: "Find a Dealer: 1-800-392-FJORD",
                tagline: "Built Fjord Tough (To Break)",
                price: "F-150 FROM $16,999*",
                disclaimer: "*Plus dealer markup, cosmic alignment fee, and sacrificial offering.",

                theme: "ford"
            },
            {
                title: "TOY-YODA",
                subtitle: "DO FOR YOU, WHAT YOU CAN'T DO, WE WILL",
                features: "Camry (Camera Not Included), We Have • Corolla, Strong It Is • 4Runner That Run It Cannot",
                special: "UP TO $3000 CASHBACK, RECEIVE YOU WILL! (IN MONOPOLY MONEY, PAID IT IS)",
                phone: "Customer Care: 1-800-GO-TOY-YODA",
                tagline: "Every Day Break, These Cars Do",
                price: "FROM $18,998 CAMRY COSTS*",
                disclaimer: "*MSRP plus dealer markups, handling fees, and emotional damage, pay you must.",

                theme: "toyota"
            },

            // Toys & Entertainment (Parodies)
            {
                title: "TOYS\"AREN'T\"US",
                subtitle: "WE DON'T WANNA GROW UP (MENTALLY)",
                features: "Knockoff Pokemon Cards • Furby's Evil Twin • Nintendo 63 • Bikes With Square Wheels",
                special: "LAYAWAY FOREVER!",
                phone: "Store Hours: 1-800-TOYS-ARENT-US",
                tagline: "I'm a Toys\"Aren't\"Us Kid (Unfortunately)",
                price: "POKEMON CARDS $3.99*",
                disclaimer: "*Cards may not actually be Pokemon. May contain traces of disappointment.",

                theme: "toys-r-us"
            },
            {
                title: "COLOMBIA HOUSE OF PAIN",
                subtitle: "12 CDS FOR THE PRICE OF YOUR SOUL",
                features: "Backstreet Boys Covers • Britney Fears • Emineminemineminem • TLC (Tender Loving Confusion)",
                special: "JUST PAY SHIPPING! (TO MARS)",
                phone: "Order Now: 1-800-COLOMBIA-PAIN",
                tagline: "Music the Way You Don't Want It",
                price: "ONLY 1CENTS + S&H*",
                disclaimer: "*Shipping & Handling fee equivalent to small nation's GDP.",

                theme: "music-club"
            },
            {
                title: "1-800-MATTRESS-MAYBE",
                subtitle: "LEAVE OFF THE LAST 'S' FOR DISAPPOINTMENT!",
                features: "Lumpy Mattresses • Same Day Delivery (To Wrong Address) • All Sizes (Sort Of)",
                special: "NO CREDIT? PERFECT! YOU'LL FIT RIGHT IN!",
                phone: "Call Now: 1-800-MATTRES-MAYBE",
                tagline: "We Deliver Sleepless Nights",
                price: "QUEEN SETS $299*",
                disclaimer: "*Assembly required. Sleep not guaranteed. May contain traces of insomnia.",

                theme: "mattress"
            },
            {
                title: "1-800-DENTIST-MAYBE",
                subtitle: "WHEN YOU CAN'T WAIT FOR DISAPPOINTMENT",
                features: "24/7 Referrals (To Veterinarians) • Emergency Care (Band-Aids Only)",
                special: "FREE CONSULTATION! (ADVICE NOT INCLUDED)",
                phone: "Call Now: 1-800-DENTIST-MAYBE",
                tagline: "Taking the Pain and Adding More",
                price: "CLEANINGS FROM $99*",
                disclaimer: "*Cleaning quality not guaranteed. May result in more cavities.",

                theme: "medical"
            },
            {
                title: "PATHETIC-MARK",
                subtitle: "NO FINER FOOD ANYWHERE (THAT'S THE PROBLEM)",
                features: "Fresh Produce (From Last Month) • Deli • Pharmacy (Sells Candy)",
                special: "DOUBLE COUPONS EVERY WEDNESDAY! (TRIPLE PRICES EVERY OTHER DAY)",
                phone: "Store Locator: 1-800-PATHETIC-MARK",
                tagline: "Where Freshness Counts Down to Zero",
                price: "GROCERIES FROM $1*",
                disclaimer: "*Actual grocery content may vary. Expiration dates are suggestions.",

                theme: "grocery"
            },
            {
                title: "BMG MUSIC DISSERVICE",
                subtitle: "BUY 1 GET 11 FREE (POLKA ALBUMS)",
                features: "Rock • Pop • Country • Elevator Music",
                special: "NO COMMITMENT AFTER TRIAL! (BECAUSE WE'LL FORGET)",
                phone: "Join Today: 1-800-BMG-DISSERVICE",
                tagline: "The Music Sometimes Stops",
                price: "11 FREE CDS*",
                disclaimer: "*Free CDs are all the same song played backwards.",

                theme: "music-service"
            }
        ];
    }

    shuffleAdvertisements() {
        for (let i = this.advertisements.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.advertisements[i], this.advertisements[j]] = [this.advertisements[j], this.advertisements[i]];
        }
    }

    startAdRotation() {
        if (this.adTimer) {
            clearInterval(this.adTimer);
        }

        // Show first ad immediately
        this.showCurrentAd();

        // Set up rotation timer
        this.adTimer = setInterval(() => {
            this.nextAd();
        }, TV_GUIDE_CONFIG.AD_ROTATION_INTERVAL || 6000); // Default 6 seconds
    }

    nextAd() {
        this.currentAdIndex = (this.currentAdIndex + 1) % this.advertisements.length;
        
        // Reshuffle when we complete a cycle
        if (this.currentAdIndex === 0) {
            this.shuffleAdvertisements();
            console.log('Advertisement cycle completed, reshuffling ads');
        }
        
        this.showCurrentAd();
    }

    showCurrentAd() {
        if (!this.adElement || this.advertisements.length === 0) {
            return;
        }

        const ad = this.advertisements[this.currentAdIndex];
        
        // Apply transition effect
        this.adElement.style.transition = 'opacity 0.5s ease-in-out';
        this.adElement.style.opacity = '0';

        setTimeout(() => {
            // Update the ad content
            this.adElement.style.background = ad.background;
            
            // Process text to handle cent symbols properly
            let processedPrice = ad.price;
            let processedSpecial = ad.special;
            
            if (processedPrice) {
                processedPrice = processedPrice.replace(/CENTS/g, '<span class="cent-symbol">¢</span>');
            }
            if (processedSpecial) {
                processedSpecial = processedSpecial.replace(/CENTS/g, '<span class="cent-symbol">¢</span>');
            }
            
            this.adElement.innerHTML = `
                <div class="mega-video-ad ${ad.theme}">
                    <div class="ad-title">${ad.title}</div>
                    <div class="ad-subtitle">${ad.subtitle}</div>
                    <div class="ad-features">${ad.features}</div>
                    ${processedPrice ? `<div class="ad-price">${processedPrice}</div>` : ''}
                    <div class="ad-special">${processedSpecial}</div>
                    <div class="ad-phone">${ad.phone}</div>
                    <div class="ad-tagline">${ad.tagline}</div>
                    ${ad.disclaimer ? `<div class="ad-disclaimer">${ad.disclaimer}</div>` : ''}
                </div>
            `;

            // Fade back in
            this.adElement.style.opacity = '1';
        }, 250);

        console.log(`Showing ad: ${ad.title}`);
    }

    // Method to manually trigger next ad (for testing)
    triggerNextAd() {
        if (this.isInitialized) {
            this.nextAd();
        }
    }

    // Method to pause ad rotation
    pauseRotation() {
        if (this.adTimer) {
            clearInterval(this.adTimer);
            this.adTimer = null;
        }
    }

    // Method to resume ad rotation
    resumeRotation() {
        if (!this.adTimer && this.isInitialized) {
            this.startAdRotation();
        }
    }

    destroy() {
        if (this.adTimer) {
            clearInterval(this.adTimer);
            this.adTimer = null;
        }
        this.isInitialized = false;
    }
}
