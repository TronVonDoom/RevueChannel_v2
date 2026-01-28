// Comprehensive TV Guide Data - 1990s Style
// This file contains extensive programming data for all channels

const COMPREHENSIVE_TV_DATA = {
    // Time-based programming templates
    programmingTemplates: {
        // Broadcast Networks (NBC, CBS, ABC, FOX)
        broadcast: {
            earlyMorning: { // 4:00 - 6:00 AM
                NBC: ['Today Show Preparation', 'NBC News Update', 'Infomercial'],
                CBS: ['CBS Morning News', 'The Early Show Prep', 'Infomercial'],
                ABC: ['World News This Morning', 'Good Morning America Prep', 'Infomercial'],
                FOX: ['FOX News Brief', 'Infomercial', 'Kids Programming Preview']
            },
            morning: { // 6:00 - 12:00 PM
                NBC: ['Today Show', 'Later Today', 'Leeza', 'Days of Our Lives'],
                CBS: ['CBS This Morning', 'The Price is Right', 'Young and the Restless', 'As the World Turns'],
                ABC: ['Good Morning America', 'Live with Regis & Kathie Lee', 'All My Children', 'One Life to Live'],
                FOX: ['Good Day Live', 'Mike & Maty', 'Cops', 'The People\'s Court']
            },
            afternoon: { // 12:00 - 5:00 PM
                NBC: ['Another World', 'Sunset Beach', 'Maury', 'Oprah Winfrey Show'],
                CBS: ['Guiding Light', 'As the World Turns', 'The Bold & Beautiful', 'The Young & Restless'],
                ABC: ['General Hospital', 'Port Charles', 'The City', 'Rosie O\'Donnell Show'],
                FOX: ['Beverly Hills 90210', 'Melrose Place', 'Judge Judy', 'Geraldo']
            },
            earlyEvening: { // 5:00 - 8:00 PM
                NBC: ['NBC Nightly News', 'Wheel of Fortune', 'Jeopardy!'],
                CBS: ['CBS Evening News', 'Entertainment Tonight', 'Wheel of Fortune'],
                ABC: ['ABC World News Tonight', 'Jeopardy!', 'Wheel of Fortune'],
                FOX: ['FOX News at 5', 'The Simpsons', 'King of the Hill']
            },
            primetime: { // 8:00 - 11:00 PM
                NBC: {
                    Monday: ['Fresh Prince of Bel-Air', 'The Jeff Foxworthy Show', 'Suddenly Susan', 'Caroline in the City'],
                    Tuesday: ['Wings', 'NewsRadio', 'Frasier', 'Madman of the People'],
                    Wednesday: ['Unsolved Mysteries', 'Dateline NBC', 'Law & Order'],
                    Thursday: ['Friends', 'The Single Guy', 'Seinfeld', 'Madman of the People'],
                    Friday: ['Unsolved Mysteries', 'Homicide: Life on the Street', 'Dateline NBC'],
                    Saturday: ['Emergency!', 'The Pretender', 'Profiler'],
                    Sunday: ['NBC Sunday Night Movie', 'Dateline NBC']
                },
                CBS: {
                    Monday: ['The Nanny', 'Almost Perfect', 'Murphy Brown', 'Chicago Hope'],
                    Tuesday: ['CBS Tuesday Movie', 'Chicago Hope'],
                    Wednesday: ['Touched by an Angel', 'Cybill', 'Central Park West'],
                    Thursday: ['Murder, She Wrote', 'The CBS Thursday Movie'],
                    Friday: ['Dr. Quinn, Medicine Woman', 'Walker, Texas Ranger'],
                    Saturday: ['Walker, Texas Ranger', 'The CBS Saturday Movie'],
                    Sunday: ['60 Minutes', 'Murder, She Wrote', 'CBS Sunday Movie']
                },
                ABC: {
                    Monday: ['Coach', 'The Jeff Foxworthy Show', 'Monday Night Football'],
                    Tuesday: ['Roseanne', 'Home Improvement', 'Grace Under Fire', 'NYPD Blue'],
                    Wednesday: ['Ellen', 'The Drew Carey Show', 'Primetime Live'],
                    Thursday: ['Family Matters', 'Boy Meets World', 'Step by Step', '20/20'],
                    Friday: ['Family Matters', 'Boy Meets World', 'Sabrina', '20/20'],
                    Saturday: ['ABC Saturday Movie', 'The Commish'],
                    Sunday: ['America\'s Funniest Home Videos', 'Lois & Clark', 'ABC Sunday Movie']
                },
                FOX: {
                    Monday: ['Melrose Place', 'Ally McBeal'],
                    Tuesday: ['The Simpsons', 'King of the Hill', 'Home Improvement', 'The X-Files'],
                    Wednesday: ['Beverly Hills 90210', 'Party of Five'],
                    Thursday: ['Living Single', 'New York Undercover', 'The X-Files'],
                    Friday: ['The Simpsons', 'King of the Hill', 'Millennium'],
                    Saturday: ['Cops', 'America\'s Most Wanted', 'MADtv'],
                    Sunday: ['The Simpsons', 'King of the Hill', 'The X-Files', 'Millennium']
                }
            },
            lateNight: { // 11:00 PM - 4:00 AM
                NBC: ['Tonight Show with Jay Leno', 'Late Night with Conan O\'Brien', 'Later', 'NBC Nightside'],
                CBS: ['Late Show with David Letterman', 'The Late Late Show', 'CBS Up All Night'],
                ABC: ['Nightline', 'Politically Incorrect', 'ABC World News Now'],
                FOX: ['Mad TV', 'The X-Files', 'Cops', 'Infomercial']
            }
        },

        // Cable Networks
        cable: {
            // Premium Channels
            HBO: {
                morning: ['HBO Movie', 'Real Sex', 'Documentary'],
                afternoon: ['HBO Original Series', 'Comedy Special', 'HBO Movie'],
                primetime: ['The Sopranos', 'Sex and the City', 'Oz', 'First & Ten'],
                latenight: ['Real Sex', 'Taxicab Confessions', 'HBO After Dark']
            },
            
            Showtime: {
                morning: ['Showtime Movie', 'Documentary'],
                afternoon: ['Red Shoe Diaries', 'The Outer Limits', 'Showtime Movie'],
                primetime: ['Stargate SG-1', 'Dead Man\'s Gun', 'Poltergeist: The Legacy'],
                latenight: ['Red Shoe Diaries', 'Adult Content', 'Late Night Movie']
            },

            // News Networks
            CNN: {
                morning: ['CNN Morning News', 'American Morning'],
                afternoon: ['CNN Live Today', 'Inside Politics', 'Crossfire'],
                primetime: ['The World Today', 'Crossfire', 'Larry King Live'],
                latenight: ['CNN Tonight', 'World Business Today', 'CNN Headline News']
            },

            // Music Networks
            MTV: {
                morning: ['Music Videos', 'MTV Jams'],
                afternoon: ['Total Request Live', 'The Real World', 'Road Rules'],
                primetime: ['Beavis and Butt-head', 'The Real World', 'Singled Out'],
                latenight: ['Alternative Nation', '120 Minutes', 'Headbangers Ball']
            },

            VH1: {
                morning: ['VH1 Morning', 'Music Videos'],
                afternoon: ['Pop Up Video', 'Behind the Music', 'VH1 Storytellers'],
                primetime: ['Behind the Music', 'Where Are They Now?', 'VH1 Fashion Awards'],
                latenight: ['VH1 Classic', 'Music Videos', 'Adult Alternative']
            },

            // Kids Networks
            Nickelodeon: {
                morning: ['Rugrats', 'Doug', 'The Ren & Stimpy Show'],
                afternoon: ['Clarissa Explains It All', 'The Secret World of Alex Mack', 'Are You Afraid of the Dark?'],
                primetime: ['Nick at Nite', 'The Brady Bunch', 'Happy Days'],
                latenight: ['Nick at Nite', 'I Love Lucy', 'The Honeymooners']
            },

            Disney: {
                morning: ['DuckTales', 'Chip \'n Dale: Rescue Rangers', 'Goof Troop'],
                afternoon: ['Adventures of the Gummi Bears', 'TaleSpin', 'Darkwing Duck'],
                primetime: ['Disney Movie', 'The Wonderful World of Disney'],
                latenight: ['Disney Movie', 'Classic Disney Shorts']
            },

            // Sports
            ESPN: {
                morning: ['SportsCenter', 'First Take', 'Cold Pizza'],
                afternoon: ['SportsCenter', 'Baseball Tonight', 'College Basketball'],
                primetime: ['Monday Night Football', 'SportsCenter', 'Baseball Tonight'],
                latenight: ['SportsCenter', 'Baseball Tonight', 'Sports Reporters']
            },

            // Comedy
            'Comedy Central': {
                morning: ['Comedy Central Presents', 'Stand-Up Stand-Up'],
                afternoon: ['Mystery Science Theater 3000', 'Absolutely Fabulous'],
                primetime: ['South Park', 'The Daily Show', 'Win Ben Stein\'s Money'],
                latenight: ['South Park', 'Dr. Katz', 'Comedy Central Presents']
            },

            // Sci-Fi
            'Sci-Fi': {
                morning: ['Quantum Leap', 'Sliders'],
                afternoon: ['The Twilight Zone', 'Tales from the Crypt', 'Poltergeist: The Legacy'],
                primetime: ['The X-Files', 'Millennium', 'Mystery Science Theater 3000'],
                latenight: ['Tales from the Crypt', 'Poltergeist: The Legacy', 'The Outer Limits']
            },

            // Discovery
            Discovery: {
                morning: ['How It\'s Made', 'Modern Marvels'],
                afternoon: ['Wild Discovery', 'Beyond 2000', 'Mysteries of the Ancient World'],
                primetime: ['Discovery Channel Sunday', 'Wild Discovery', 'Modern Marvels'],
                latenight: ['How It\'s Made', 'Beyond 2000', 'The New Detectives']
            },

            // Lifetime
            Lifetime: {
                morning: ['Lifetime Movie', 'Designing Women'],
                afternoon: ['The Golden Girls', 'thirtysomething', 'Lifetime Movie'],
                primetime: ['Intimate Portrait', 'Unsolved Mysteries', 'Lifetime Movie'],
                latenight: ['Lifetime Movie', 'Golden Girls', 'Designing Women']
            },

            // A&E
            'A&E': {
                morning: ['Biography', 'Ancient Mysteries'],
                afternoon: ['Investigative Reports', 'American Justice', 'Biography'],
                primetime: ['Biography', 'Investigative Reports', 'Ancient Mysteries'],
                latenight: ['Biography', 'American Justice', 'Investigative Reports']
            },

            // USA Network
            USA: {
                morning: ['Cartoon Express', 'Saved by the Bell'],
                afternoon: ['Murder, She Wrote', 'MacGyver', 'Quantum Leap'],
                primetime: ['La Femme Nikita', 'Silk Stalkings', 'Duckman'],
                latenight: ['Silk Stalkings', 'Murder, She Wrote', 'MacGyver']
            },

            // TNT
            TNT: {
                morning: ['Looney Tunes', 'Tom & Jerry'],
                afternoon: ['In the Heat of the Night', 'Matlock', 'Murder, She Wrote'],
                primetime: ['WCW Monday Nitro', 'Babylon 5', 'The Pretender'],
                latenight: ['MonsterVision', 'Babylon 5', 'In the Heat of the Night']
            },

            // TBS
            TBS: {
                morning: ['The Flintstones', 'Scooby-Doo'],
                afternoon: ['The Andy Griffith Show', 'Gilligan\'s Island', 'The Brady Bunch'],
                primetime: ['Friends', 'Seinfeld', 'Movies for Guys Who Like Movies'],
                latenight: ['Very Funny', 'The Three Stooges', 'Movies']
            },

            // Weather Channel
            'Weather Channel': {
                morning: ['Weather on the 8s', 'Local Forecast', 'Weather Center'],
                afternoon: ['Weather Classroom', 'Local Forecast', 'Storm Stories'],
                primetime: ['Weather Center', 'Local Forecast', 'Storm Stories'],
                latenight: ['Weather Center', 'Local Forecast', 'Storm Watch']
            }
        }
    },

    // Movie database for premium channels and movie networks
    movies: {
        action: [
            { title: 'Die Hard', year: 1988, duration: 132 },
            { title: 'Lethal Weapon', year: 1987, duration: 110 },
            { title: 'Speed', year: 1994, duration: 116 },
            { title: 'The Rock', year: 1996, duration: 136 },
            { title: 'Independence Day', year: 1996, duration: 145 },
            { title: 'Mission: Impossible', year: 1996, duration: 110 },
            { title: 'Twister', year: 1996, duration: 113 },
            { title: 'Eraser', year: 1996, duration: 115 },
            { title: 'The Long Kiss Goodnight', year: 1996, duration: 121 },
            { title: 'Con Air', year: 1997, duration: 115 }
        ],
        drama: [
            { title: 'Titanic', year: 1997, duration: 195 },
            { title: 'Forrest Gump', year: 1994, duration: 142 },
            { title: 'Apollo 13', year: 1995, duration: 140 },
            { title: 'The Shawshank Redemption', year: 1994, duration: 142 },
            { title: 'Philadelphia', year: 1993, duration: 125 },
            { title: 'A Few Good Men', year: 1992, duration: 138 },
            { title: 'The Firm', year: 1993, duration: 154 },
            { title: 'The Pelican Brief', year: 1993, duration: 141 },
            { title: 'The Client', year: 1994, duration: 119 },
            { title: 'JFK', year: 1991, duration: 189 }
        ],
        comedy: [
            { title: 'Dumb and Dumber', year: 1994, duration: 107 },
            { title: 'Ace Ventura: Pet Detective', year: 1994, duration: 86 },
            { title: 'The Mask', year: 1994, duration: 101 },
            { title: 'Mrs. Doubtfire', year: 1993, duration: 125 },
            { title: 'Home Alone', year: 1990, duration: 103 },
            { title: 'Home Alone 2', year: 1992, duration: 120 },
            { title: 'Wayne\'s World', year: 1992, duration: 94 },
            { title: 'Groundhog Day', year: 1993, duration: 101 },
            { title: 'Big', year: 1988, duration: 104 },
            { title: 'Coming to America', year: 1988, duration: 117 }
        ],
        thriller: [
            { title: 'The Silence of the Lambs', year: 1991, duration: 118 },
            { title: 'Seven', year: 1995, duration: 127 },
            { title: 'The Fugitive', year: 1993, duration: 130 },
            { title: 'Basic Instinct', year: 1992, duration: 127 },
            { title: 'Fatal Attraction', year: 1987, duration: 119 },
            { title: 'Cape Fear', year: 1991, duration: 128 },
            { title: 'Sleeping with the Enemy', year: 1991, duration: 99 },
            { title: 'The Hand That Rocks the Cradle', year: 1992, duration: 110 },
            { title: 'Unlawful Entry', year: 1992, duration: 111 },
            { title: 'Single White Female', year: 1992, duration: 107 }
        ],
        scifi: [
            { title: 'The Matrix', year: 1999, duration: 136 },
            { title: 'Jurassic Park', year: 1993, duration: 127 },
            { title: 'Terminator 2', year: 1991, duration: 137 },
            { title: 'Aliens', year: 1986, duration: 137 },
            { title: 'Total Recall', year: 1990, duration: 113 },
            { title: 'Back to the Future', year: 1985, duration: 116 },
            { title: 'Back to the Future II', year: 1989, duration: 108 },
            { title: 'Back to the Future III', year: 1990, duration: 118 },
            { title: 'E.T.', year: 1982, duration: 115 },
            { title: 'Close Encounters', year: 1977, duration: 138 }
        ],
        family: [
            { title: 'The Lion King', year: 1994, duration: 88 },
            { title: 'Beauty and the Beast', year: 1991, duration: 84 },
            { title: 'Aladdin', year: 1992, duration: 90 },
            { title: 'Pocahontas', year: 1995, duration: 81 },
            { title: 'The Little Mermaid', year: 1989, duration: 83 },
            { title: 'Toy Story', year: 1995, duration: 81 },
            { title: 'The Santa Clause', year: 1994, duration: 97 },
            { title: 'Casper', year: 1995, duration: 100 },
            { title: 'Babe', year: 1995, duration: 91 },
            { title: 'Free Willy', year: 1993, duration: 112 }
        ]
    },

    // Sports programming
    sports: {
        football: [
            { title: 'Monday Night Football', network: 'ESPN', time: 'Monday 8:00 PM' },
            { title: 'NFL on FOX', network: 'FOX', time: 'Sunday 1:00 PM' },
            { title: 'NFL on CBS', network: 'CBS', time: 'Sunday 1:00 PM' },
            { title: 'Sunday Night Football', network: 'NBC', time: 'Sunday 8:00 PM' },
            { title: 'College GameDay', network: 'ESPN', time: 'Saturday 10:00 AM' }
        ],
        basketball: [
            { title: 'NBA on NBC', network: 'NBC', time: 'Sunday 3:00 PM' },
            { title: 'NBA on TNT', network: 'TNT', time: 'Thursday 8:00 PM' },
            { title: 'College Basketball', network: 'ESPN', time: 'Various' },
            { title: 'March Madness', network: 'CBS', time: 'March' }
        ],
        baseball: [
            { title: 'Baseball Tonight', network: 'ESPN', time: '10:00 PM' },
            { title: 'Game of the Week', network: 'NBC', time: 'Saturday 1:00 PM' },
            { title: 'World Series', network: 'NBC/FOX', time: 'October' }
        ]
    },

    // PPV Events
    ppvEvents: [
        { title: 'Tyson vs. Holyfield III', price: '$49.99', type: 'Boxing' },
        { title: 'WWF WrestleMania XIII', price: '$29.99', type: 'Wrestling' },
        { title: 'UFC 12: Judgment Day', price: '$24.99', type: 'MMA' },
        { title: 'De La Hoya vs. Quartey', price: '$39.99', type: 'Boxing' },
        { title: 'WCW Starrcade', price: '$29.99', type: 'Wrestling' },
        { title: 'WWF In Your House', price: '$24.99', type: 'Wrestling' }
    ],

    // Special programming events
    specialEvents: {
        awards: [
            'Academy Awards', 'Grammy Awards', 'Emmy Awards', 'Golden Globe Awards',
            'MTV Video Music Awards', 'People\'s Choice Awards'
        ],
        holidays: [
            'Thanksgiving Day Parade', 'Christmas Specials', 'New Year\'s Eve Special',
            'Halloween Programming', 'Easter Programming'
        ],
        news: [
            'Election Coverage', 'Presidential Address', 'Breaking News Special',
            'State of the Union', 'Supreme Court Decision Coverage'
        ]
    },

    // Channel-specific programming notes
    channelFeatures: {
        PREVUE: {
            specialShows: ['Movie Reviews', 'TV Previews', 'Channel Lineup Updates'],
            interstitials: ['Local Weather', 'Community Events', 'Lottery Numbers']
        },
        QVC: {
            products: ['Jewelry', 'Electronics', 'Home & Garden', 'Fashion', 'Beauty'],
            hostSchedule: ['Mary Beth Roe', 'Dan Hughes', 'David Venable', 'Lisa Robertson']
        },
        HSN: {
            products: ['Kitchen & Dining', 'Home Improvement', 'Electronics', 'Jewelry'],
            hostSchedule: ['Bob Bowersox', 'Judy Crowell', 'Tom O\'Dell']
        },
        EWTN: {
            programming: ['Daily Mass', 'The Rosary', 'EWTN News', 'Catholic Programming'],
            languages: ['English', 'Spanish', 'French']
        }
    }
};

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = COMPREHENSIVE_TV_DATA;
} else if (typeof window !== 'undefined') {
    window.COMPREHENSIVE_TV_DATA = COMPREHENSIVE_TV_DATA;
}
