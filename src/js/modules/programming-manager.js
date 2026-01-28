// Programming Manager Module
// Handles program generation, time-based content, and fallback programming

import { TV_GUIDE_CONFIG } from './config.js';

export class ProgrammingManager {
    constructor() {
        this.programmingGenerator = null;
        this.extensiveProgrammingDatabase = null;
        this.initializeAdvancedProgramming();
    }

    initializeAdvancedProgramming() {
        // Initialize advanced programming generator if available
        if (typeof AdvancedProgrammingGenerator !== 'undefined') {
            this.programmingGenerator = new AdvancedProgrammingGenerator();
        }
        
        this.loadExtensiveProgrammingDatabase();
    }

    loadExtensiveProgrammingDatabase() {
        this.extensiveProgrammingDatabase = {
            // Syndicated shows that appear on multiple channels
            syndicated: {
                sitcoms: [
                    'Cheers', 'Friends', 'Seinfeld', 'Full House', 'Family Matters', 'Perfect Strangers',
                    'Growing Pains', 'Who\'s the Boss?', 'Three\'s Company', 'The Cosby Show', 
                    'Different World', 'Fresh Prince of Bel-Air', 'Saved by the Bell', 'Family Ties',
                    'Night Court', 'Taxi', 'Barney Miller', 'WKRP in Cincinnati', 'NewsRadio',
                    'Wings', 'Frasier', 'Murphy Brown', 'Designing Women', 'Golden Girls',
                    'Empty Nest', 'Major Dad', 'Coach', 'Home Improvement', 'Roseanne'
                ],
                dramas: [
                    'Law & Order', 'Murder, She Wrote', 'Matlock', 'In the Heat of the Night',
                    'Columbo', 'Quincy M.E.', 'MacGyver', 'Magnum P.I.', 'Miami Vice',
                    'The A-Team', 'Knight Rider', 'Hunter', 'Jake in Progress', 'Silk Stalkings',
                    'Highlander', 'Quantum Leap', 'Star Trek: The Next Generation', 
                    'Star Trek: Deep Space Nine', 'Babylon 5', 'The X-Files', 'Outer Limits'
                ],
                oldShows: [
                    'I Love Lucy', 'The Honeymooners', 'Leave it to Beaver', 'Andy Griffith Show',
                    'Gilligan\'s Island', 'Green Acres', 'Petticoat Junction', 'The Beverly Hillbillies',
                    'Bewitched', 'I Dream of Jeannie', 'Get Smart', 'Hogan\'s Heroes',
                    'The Addams Family', 'The Munsters', 'Lost in Space', 'The Twilight Zone'
                ]
            },
            // Kids programming
            kids: [
                'Rugrats', 'Doug', 'Hey Arnold!', 'Ren & Stimpy', 'Rocko\'s Modern Life',
                'DuckTales', 'Chip n Dale Rescue Rangers', 'Goof Troop', 'TaleSpin',
                'Darkwing Duck', 'Gargoyles', 'Animaniacs', 'Tiny Toon Adventures',
                'Tom and Jerry', 'Scooby-Doo', 'The Flintstones', 'Yogi Bear',
                'The Jetsons', 'Popeye', 'Inspector Gadget', 'He-Man', 'Transformers',
                'G.I. Joe', 'My Little Pony', 'Care Bears', 'Smurfs'
            ],
            // News and Talk
            news: [
                'Evening News', 'Morning News', 'News at Noon', 'Breaking News', 'News Update',
                'Weather Center', 'Traffic Report', 'Local News', 'National News', 'World News'
            ],
            talk: [
                'Oprah Winfrey Show', 'Phil Donahue', 'Sally Jessy Raphael', 'Jerry Springer',
                'Montel Williams', 'Ricki Lake', 'Jenny Jones', 'Maury Povich',
                'Geraldo Rivera', 'Joan Rivers', 'Rosie O\'Donnell Show'
            ],
            // Game shows
            gameShows: [
                'Wheel of Fortune', 'Jeopardy!', 'The Price is Right', 'Family Feud',
                'Win, Lose or Draw', 'Super Password', 'Classic Concentration',
                'Press Your Luck', 'Sale of the Century', 'Chain Reaction'
            ],
            // Sports
            sports: [
                'SportsCenter', 'Baseball Tonight', 'NFL Primetime', 'NBA Action',
                'Hockey Night', 'College GameDay', 'Tennis Championship', 'Golf Tournament',
                'Olympic Games', 'Auto Racing', 'Boxing Match', 'Wrestling'
            ],
            // Movies by genre
            movies: {
                action: [
                    'Die Hard', 'Lethal Weapon', 'Speed', 'The Rock', 'Con Air', 'Face/Off',
                    'Eraser', 'Last Action Hero', 'True Lies', 'Terminator 2', 'Predator',
                    'Total Recall', 'Demolition Man', 'Judge Dredd', 'Point Break'
                ],
                comedy: [
                    'Dumb and Dumber', 'Ace Ventura', 'The Mask', 'Mrs. Doubtfire', 'Home Alone',
                    'Wayne\'s World', 'Bill & Ted\'s Excellent Adventure', 'Coming to America',
                    'Beverly Hills Cop', 'Ghostbusters', 'Groundhog Day', 'Big'
                ],
                drama: [
                    'Forrest Gump', 'The Shawshank Redemption', 'Apollo 13', 'JFK',
                    'A Few Good Men', 'The Firm', 'Philadelphia', 'Scent of a Woman',
                    'Rain Man', 'Good Will Hunting', 'Dead Poets Society'
                ],
                classic: [
                    'Casablanca', 'Gone with the Wind', 'The Wizard of Oz', 'Citizen Kane',
                    'The Maltese Falcon', 'Singin\' in the Rain', 'Some Like It Hot',
                    'North by Northwest', 'Psycho', 'Vertigo', 'The Third Man'
                ]
            },
            // Music and variety
            music: [
                'MTV Unplugged', 'Behind the Music', 'Pop Up Video', 'Music Videos',
                'Concert Special', 'Artist Spotlight', 'Top 10 Countdown', 'Alternative Nation',
                'Headbangers Ball', '120 Minutes', 'Club MTV', 'Yo! MTV Raps'
            ],
            // Documentary
            documentary: [
                'Biography', 'How It\'s Made', 'Wild Discovery', 'Modern Marvels',
                'Ancient Mysteries', 'Unsolved Mysteries', 'Investigative Reports',
                'Beyond 2000', 'Wings', 'Civil War Journal', 'History\'s Mysteries'
            ],
            // Shopping
            shopping: [
                'Jewelry Collection', 'Fashion Show', 'Kitchen Essentials', 'Electronics Hour',
                'Home & Garden', 'Beauty Secrets', 'Collectibles', 'Fitness Equipment',
                'Today\'s Special Value', 'Clearance Event'
            ],
            // Religious
            religious: [
                'Sunday Service', 'Daily Mass', 'Gospel Hour', 'Inspirational Programming',
                'Bible Study', 'Prayer Time', 'Faith & Values', 'Religious Music'
            ]
        };
    }

    generateChannelData() {
        const channels = [
            { number: 2, call: 'CSPAN', network: 'C-SPAN' },
            { number: 3, call: 'WWL', network: 'CBS' },
            { number: 4, call: 'PREVUE', network: 'Prevue' },
            { number: 5, call: 'HBO', network: 'HBO' },
            { number: 6, call: 'GOVT', network: 'Government' },
            { number: 7, call: 'WDSU', network: 'NBC' },
            { number: 8, call: 'EDUCA', network: 'Educational' },
            { number: 9, call: 'WVUE', network: 'FOX' },
            { number: 10, call: 'COX', network: 'Cox Metro' },
            { number: 11, call: 'WGNO', network: 'ABC' },
            { number: 12, call: 'WYES', network: 'PBS' },
            { number: 13, call: 'WNOL', network: 'WB' },
            { number: 14, call: 'WLAE', network: 'Independent' },
            { number: 15, call: 'LOCAL', network: 'Local News' },
            { number: 16, call: 'SHO', network: 'Showtime' },
            { number: 17, call: 'TBS', network: 'TBS' },
            { number: 18, call: 'WGN', network: 'WGN' },
            { number: 19, call: 'LEARN', network: 'Learning Channel' },
            { number: 20, call: 'MAX', network: 'Cinemax' },
            { number: 21, call: 'DIS', network: 'Disney Channel' },
            { number: 22, call: 'BET', network: 'BET' },
            { number: 23, call: 'A&E', network: 'A&E' },
            { number: 24, call: 'WEATHR', network: 'Weather Channel' },
            { number: 25, call: 'TNT', network: 'TNT' },
            { number: 26, call: 'AMC', network: 'AMC' },
            { number: 27, call: 'MTV', network: 'MTV' },
            { number: 28, call: 'USA', network: 'USA' },
            { number: 29, call: 'CNN', network: 'CNN' },
            { number: 30, call: 'QVC', network: 'QVC' },
            { number: 31, call: 'NICK', network: 'Nickelodeon' },
            { number: 32, call: 'DISC', network: 'Discovery' },
            { number: 33, call: 'HLN', network: 'Headline News' },
            { number: 34, call: 'LIFE', network: 'Lifetime' },
            { number: 35, call: 'FAM', network: 'Family Channel' },
            { number: 36, call: 'TNN', network: 'Nashville Network' },
            { number: 37, call: 'HBO2', network: 'HBO 2' },
            { number: 38, call: 'ESPN', network: 'ESPN' },
            { number: 39, call: 'COMEDY', network: 'Comedy Central' },
            { number: 40, call: 'BRAVO', network: 'Bravo' },
            { number: 41, call: 'VH1', network: 'VH1' },
            { number: 42, call: 'HSN', network: 'Home Shopping' },
            { number: 43, call: 'CNBC', network: 'CNBC' },
            { number: 44, call: 'E!', network: 'E!' },
            { number: 45, call: 'SCIFI', network: 'Sci-Fi' },
            { number: 46, call: 'EWTN', network: 'EWTN/TBN' },
            { number: 47, call: 'VISN', network: 'VISN-ACTS' },
            { number: 48, call: 'CSPAN2', network: 'C-SPAN 2' },
            { number: 49, call: 'TRAVEL', network: 'Travel Channel' },
            { number: 50, call: 'ACCESS', network: 'Access' },
            { number: 51, call: 'UNIV', network: 'Univision' },
            { number: 52, call: 'PPV1', network: 'PPV' },
            { number: 53, call: 'PPV2', network: 'PPV' },
            { number: 54, call: 'PPV3', network: 'PPV' },
            { number: 55, call: 'PPV4', network: 'PPV' },
            { number: 56, call: 'TMC', network: 'Movie Channel' },
            { number: 57, call: 'FLIX', network: 'Flix' },
            { number: 58, call: 'STARZ', network: 'Starz' },
            { number: 59, call: 'ENCORE', network: 'Encore' },
            { number: 60, call: 'MMAX', network: 'MoreMax' },
            { number: 61, call: 'SNEAK', network: 'Sneak Prevue' }
        ];

        return channels.map(channel => ({
            ...channel,
            programs: this.assignProgramsToChannel(channel)
        }));
    }

    assignProgramsToChannel(channel) {
        const programs = [];
        const visibleSlots = TV_GUIDE_CONFIG.VISIBLE_TIME_SLOTS;
        
        // Process each slot individually to ensure proper arrow calculation
        for (let slot = 0; slot < visibleSlots; slot++) {
            const program = this.getProgramForCurrentTimeSlot(channel, slot);
            
            if (program) {
                // Calculate arrows based on program duration and position
                const programSlots = Math.ceil(program.duration / TV_GUIDE_CONFIG.TIME_SLOT_DURATION);
                
                // For multi-slot programs, only show on the first slot and add arrows
                if (programSlots > 1 && slot === 0) {
                    // Program spans multiple slots
                    const rightArrows = Math.max(0, Math.min(3, programSlots - visibleSlots));
                    
                    programs.push({
                        ...program,
                        startTime: this.getTimeSlotTime(slot),
                        slotIndex: slot,
                        leftArrows: 0,
                        rightArrows: rightArrows,
                        spanSlots: programSlots
                    });
                    
                    // Skip the next slots that this program occupies
                    const slotsToSkip = Math.min(programSlots - 1, visibleSlots - 1);
                    slot += slotsToSkip;
                    
                    console.log(`${channel.call} - ${program.title}: ${programSlots} slots, rightArrows: ${rightArrows}, skipping ${slotsToSkip} slots`);
                } else if (programSlots === 1 || slot > 0) {
                    // Single slot program or continuation after a multi-slot program
                    programs.push({
                        ...program,
                        startTime: this.getTimeSlotTime(slot),
                        slotIndex: slot,
                        leftArrows: 0,
                        rightArrows: 0
                    });
                }
            } else {
                // No program available for this slot - create a proper fallback
                const timeOfDay = this.getTimeOfDay(slot);
                const fallbackProgram = this.generateFallbackProgram(channel, timeOfDay);
                programs.push({
                    ...fallbackProgram,
                    startTime: this.getTimeSlotTime(slot),
                    slotIndex: slot,
                    leftArrows: 0,
                    rightArrows: 0
                });
            }
        }
        
        return programs;
    }

    getProgramForCurrentTimeSlot(channel, slotOffset = 0) {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        
        console.log(`Getting program for ${channel.call} at slot offset ${slotOffset}`);
        
        // Use advanced programming generator if available
        if (this.programmingGenerator) {
            try {
                const program = this.programmingGenerator.generateProgramForChannel(channel, slotOffset, dayOfWeek);
                if (program && program.title && program.title !== 'Programming') {
                    console.log(`Advanced program for ${channel.call}:`, program);
                    return this.cleanProgramInfo(program);
                }
            } catch (error) {
                console.warn('Advanced programming generator failed, using fallback:', error);
            }
        }
        
        // Use comprehensive fallback programming - guaranteed to never return "No Programming"
        const timeOfDay = this.getTimeOfDay(slotOffset);
        const program = this.generateFallbackProgram(channel, timeOfDay);
        
        console.log(`Fallback program for ${channel.call}:`, program);
        return this.cleanProgramInfo(program);
    }

    cleanProgramInfo(program) {
        if (!program) return program;
        
        // Keep only essential fields
        return {
            title: program.title,
            category: program.category,
            duration: program.duration
        };
    }

    generateFallbackProgram(channel, timeOfDay = 'any') {
        const database = this.extensiveProgrammingDatabase;
        let program;

        // Channel-specific programming logic (truncated for brevity)
        switch (channel.call) {
            case 'CSPAN':
            case 'CSPAN2':
                const govPrograms = ['Congressional Hearing', 'Senate Session', 'House Proceedings', 'Committee Meeting', 'Political Forum', 'Public Policy Discussion'];
                program = { title: this.randomFromArray(govPrograms), category: 'news', duration: 60 };
                break;

            case 'WWL':
            case 'WDSU':
            case 'WGNO':
                if (timeOfDay === 'morning') {
                    program = { title: 'Morning News', category: 'news', duration: 30 };
                } else if (timeOfDay === 'evening') {
                    program = { title: 'Evening News', category: 'news', duration: 30 };
                } else {
                    program = { title: this.randomFromArray(database.syndicated.sitcoms), category: 'comedy', duration: 30 };
                }
                break;

            case 'HBO':
            case 'HBO2':
            case 'SHO':
            case 'MAX':
            case 'TMC':
            case 'STARZ':
            case 'ENCORE':
                const allMovies = [].concat(
                    database.movies.action,
                    database.movies.comedy,
                    database.movies.drama,
                    database.movies.classic
                );
                program = { title: this.randomFromArray(allMovies), category: 'movie', duration: 120 };
                break;

            case 'MTV':
                if (timeOfDay === 'morning' || timeOfDay === 'afternoon') {
                    program = { title: this.randomFromArray(database.music), category: 'music', duration: 30 };
                } else {
                    program = { title: 'Beavis and Butt-head', category: 'comedy', duration: 30 };
                }
                break;

            // Add more cases as needed...

            default:
                // Ultimate fallback - use the network name with a varied program type
                const fallbackTypes = ['Morning Show', 'Afternoon Special', 'Evening Program', 'Late Night Show', 'Weekend Feature'];
                const programType = this.randomFromArray(fallbackTypes);
                program = { 
                    title: `${channel.network || channel.call} ${programType}`, 
                    category: 'misc', 
                    duration: 30 
                };
        }

        return program;
    }

    randomFromArray(array) {
        if (!array || array.length === 0) return 'Programming';
        return array[Math.floor(Math.random() * array.length)];
    }

    getTimeOfDay(slotOffset = 0) {
        const now = new Date();
        const currentHour = now.getHours();
        const adjustedHour = (currentHour + Math.floor(slotOffset / 2)) % 24;
        
        if (adjustedHour >= 6 && adjustedHour < 12) return 'morning';
        if (adjustedHour >= 12 && adjustedHour < 17) return 'afternoon';
        if (adjustedHour >= 17 && adjustedHour < 20) return 'evening';
        if (adjustedHour >= 20 && adjustedHour < 23) return 'primetime';
        return 'latenight';
    }

    getTimeSlotTime(slot) {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
        
        // Calculate times for the next 3 slots
        const times = [];
        for (let i = 0; i < TV_GUIDE_CONFIG.VISIBLE_TIME_SLOTS; i++) {
            const slotMinutes = Math.floor(currentMinutes / 30) * 30 + (i * 30);
            const slotHour = currentHour + Math.floor(slotMinutes / 60);
            const adjustedMinutes = slotMinutes % 60;
            
            const time12 = slotHour > 12 ? slotHour - 12 : slotHour === 0 ? 12 : slotHour;
            const ampm = slotHour >= 12 ? 'PM' : 'AM';
            const minuteStr = adjustedMinutes.toString().padStart(2, '0');
            
            times.push(`${time12}:${minuteStr} ${ampm}`);
        }
        
        return times[slot] || '12:00 PM';
    }
}

export default ProgrammingManager;
