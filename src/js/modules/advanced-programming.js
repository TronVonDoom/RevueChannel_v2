// Advanced Programming Generator for 90s TV Guide
// This file contains sophisticated programming logic based on time of day, day of week, and channel type

class AdvancedProgrammingGenerator {
    constructor() {
        this.loadProgrammingData();
    }

    loadProgrammingData() {
        // 90s TV Shows by Genre and Network
        this.programmingDatabase = {
            // Network Programming (NBC, CBS, ABC, FOX)
            networkShows: {
                NBC: {
                    sitcoms: ['Friends', 'Seinfeld', 'Frasier', 'Mad About You', 'Wings', 'NewsRadio', 'The Single Guy', 'Suddenly Susan', 'Caroline in the City'],
                    dramas: ['ER', 'Law & Order', 'Homicide: Life on the Street', 'The Pretender', 'Profiler'],
                    news: ['NBC Nightly News', 'Today Show', 'Dateline NBC', 'Meet the Press'],
                    latenight: ['Tonight Show with Jay Leno', 'Late Night with Conan O\'Brien', 'Saturday Night Live'],
                    daytime: ['Days of Our Lives', 'Another World', 'Sunset Beach', 'Leeza', 'Later Today']
                },
                CBS: {
                    sitcoms: ['Murphy Brown', 'Cybill', 'The Nanny', 'Almost Perfect'],
                    dramas: ['Murder, She Wrote', 'Walker, Texas Ranger', 'Chicago Hope', 'Touched by an Angel', 'Dr. Quinn, Medicine Woman'],
                    news: ['CBS Evening News', 'CBS This Morning', '60 Minutes', '48 Hours'],
                    latenight: ['Late Show with David Letterman', 'The Late Late Show'],
                    daytime: ['The Young and the Restless', 'The Bold and the Beautiful', 'As the World Turns', 'Guiding Light', 'The Price is Right']
                },
                ABC: {
                    sitcoms: ['Home Improvement', 'Roseanne', 'Ellen', 'Grace Under Fire', 'The Drew Carey Show', 'Coach'],
                    dramas: ['NYPD Blue', 'The Practice', 'Lois & Clark', 'The Commish'],
                    news: ['ABC World News Tonight', 'Good Morning America', '20/20', 'Primetime Live', 'Nightline'],
                    latenight: ['Politically Incorrect with Bill Maher'],
                    daytime: ['All My Children', 'One Life to Live', 'General Hospital', 'The View', 'Live with Regis & Kathie Lee']
                },
                FOX: {
                    sitcoms: ['The Simpsons', 'King of the Hill', 'Living Single', 'New York Undercover'],
                    dramas: ['The X-Files', 'Millennium', 'Beverly Hills 90210', 'Melrose Place', 'Party of Five', 'Ally McBeal'],
                    news: ['FOX News', 'A Current Affair'],
                    latenight: ['MADtv'],
                    reality: ['Cops', 'America\'s Most Wanted'],
                    kids: ['Power Rangers', 'X-Men', 'Spider-Man']
                }
            },

            // Cable Programming
            cableShows: {
                MTV: {
                    music: ['Total Request Live', 'MTV Jams', 'Alternative Nation', '120 Minutes', 'Headbangers Ball'],
                    reality: ['The Real World', 'Road Rules', 'Singled Out', 'Remote Control'],
                    comedy: ['Beavis and Butt-head', 'Daria', 'The State', 'Liquid Television']
                },
                CNN: {
                    news: ['CNN Morning News', 'The World Today', 'Crossfire', 'Larry King Live', 'Capital Gang', 'Inside Politics'],
                    business: ['Moneyline', 'Your Money']
                },
                ESPN: {
                    sports: ['SportsCenter', 'Baseball Tonight', 'College GameDay', 'NFL Primetime', 'Outside the Lines'],
                    events: ['Monday Night Football', 'NBA on ESPN', 'College Basketball', 'Tennis']
                },
                Nickelodeon: {
                    kids: ['Rugrats', 'Doug', 'Hey Arnold!', 'The Ren & Stimpy Show', 'Rocko\'s Modern Life', 'Clarissa Explains It All', 'The Secret World of Alex Mack', 'Are You Afraid of the Dark?'],
                    classic: ['The Brady Bunch', 'Happy Days', 'I Love Lucy', 'The Honeymooners', 'Mister Ed', 'Green Acres']
                },
                Discovery: {
                    documentary: ['How It\'s Made', 'Beyond 2000', 'Wild Discovery', 'Mysteries of the Ancient World', 'The New Detectives', 'Justice Files']
                },
                USA: {
                    dramas: ['Murder, She Wrote', 'Matlock', 'In the Heat of the Night', 'MacGyver', 'Quantum Leap'],
                    originals: ['La Femme Nikita', 'Silk Stalkings', 'Pacific Blue'],
                    comedy: ['Duckman', 'Weird Science']
                },
                SciFi: {
                    series: ['The X-Files', 'Quantum Leap', 'Sliders', 'Babylon 5', 'Mystery Science Theater 3000'],
                    movies: ['B-Movie Collection', 'Saturday Sci-Fi']
                },
                'Comedy Central': {
                    standup: ['Comedy Central Presents', 'Premium Blend', 'Stand-Up Stand-Up'],
                    series: ['South Park', 'Dr. Katz', 'The Daily Show', 'Win Ben Stein\'s Money'],
                    imports: ['Absolutely Fabulous', 'Kids in the Hall']
                }
            },

            // Premium Channel Movies
            premiumMovies: {
                action: [
                    { title: 'Die Hard', year: 1988 },
                    { title: 'Lethal Weapon', year: 1987 },
                    { title: 'Speed', year: 1994 },
                    { title: 'The Rock', year: 1996 },
                    { title: 'Independence Day', year: 1996 },
                    { title: 'Mission: Impossible', year: 1996 },
                    { title: 'Twister', year: 1996 },
                    { title: 'Eraser', year: 1996 },
                    { title: 'Con Air', year: 1997 },
                    { title: 'The Long Kiss Goodnight', year: 1996 }
                ],
                drama: [
                    { title: 'Titanic', year: 1997 },
                    { title: 'Forrest Gump', year: 1994 },
                    { title: 'The Shawshank Redemption', year: 1994 },
                    { title: 'Apollo 13', year: 1995 },
                    { title: 'Philadelphia', year: 1993 },
                    { title: 'A Few Good Men', year: 1992 },
                    { title: 'The Firm', year: 1993 },
                    { title: 'The Pelican Brief', year: 1993 },
                    { title: 'JFK', year: 1991 },
                    { title: 'Goodfellas', year: 1990 }
                ],
                comedy: [
                    { title: 'Dumb and Dumber', year: 1994 },
                    { title: 'Ace Ventura: Pet Detective', year: 1994 },
                    { title: 'The Mask', year: 1994 },
                    { title: 'Mrs. Doubtfire', year: 1993 },
                    { title: 'Home Alone', year: 1990 },
                    { title: 'Wayne\'s World', year: 1992 },
                    { title: 'Groundhog Day', year: 1993 },
                    { title: 'Big', year: 1988 },
                    { title: 'Coming to America', year: 1988 },
                    { title: 'Beverly Hills Cop', year: 1984 }
                ],
                thriller: [
                    { title: 'The Silence of the Lambs', year: 1991 },
                    { title: 'Seven', year: 1995 },
                    { title: 'The Fugitive', year: 1993 },
                    { title: 'Basic Instinct', year: 1992 },
                    { title: 'Fatal Attraction', year: 1987 },
                    { title: 'Cape Fear', year: 1991 },
                    { title: 'Sleeping with the Enemy', year: 1991 },
                    { title: 'The Hand That Rocks the Cradle', year: 1992 },
                    { title: 'Single White Female', year: 1992 },
                    { title: 'Unlawful Entry', year: 1992 }
                ]
            },

            // Time-based Programming Templates
            timeSlots: {
                earlyMorning: { start: 4, end: 6 }, // 4 AM - 6 AM
                morning: { start: 6, end: 12 }, // 6 AM - 12 PM
                afternoon: { start: 12, end: 17 }, // 12 PM - 5 PM
                earlyEvening: { start: 17, end: 20 }, // 5 PM - 8 PM
                primetime: { start: 20, end: 23 }, // 8 PM - 11 PM
                latenight: { start: 23, end: 4 } // 11 PM - 4 AM
            }
        };
    }

    generateProgramForChannel(channel, timeSlot, dayOfWeek) {
        const hour = new Date().getHours();
        const timeOfDay = this.getTimeOfDay(hour);
        
        switch (channel.network) {
            case 'NBC':
                return this.generateNetworkProgram('NBC', timeOfDay, dayOfWeek, timeSlot);
            case 'CBS':
                return this.generateNetworkProgram('CBS', timeOfDay, dayOfWeek, timeSlot);
            case 'ABC':
                return this.generateNetworkProgram('ABC', timeOfDay, dayOfWeek, timeSlot);
            case 'FOX':
                return this.generateNetworkProgram('FOX', timeOfDay, dayOfWeek, timeSlot);
            case 'HBO':
            case 'HBO 2':
                return this.generatePremiumProgram('HBO', timeOfDay);
            case 'Showtime':
                return this.generatePremiumProgram('Showtime', timeOfDay);
            case 'Cinemax':
                return this.generatePremiumProgram('Cinemax', timeOfDay);
            case 'MTV':
                return this.generateCableProgram('MTV', timeOfDay);
            case 'CNN':
                return this.generateNewsProgram('CNN', timeOfDay);
            case 'ESPN':
                return this.generateSportsProgram(timeOfDay, dayOfWeek);
            case 'Nickelodeon':
                return this.generateKidsProgram(timeOfDay);
            case 'Discovery':
                return this.generateDocumentaryProgram();
            case 'USA':
                return this.generateCableProgram('USA', timeOfDay);
            case 'Sci-Fi':
                return this.generateCableProgram('SciFi', timeOfDay);
            case 'Comedy Central':
                return this.generateCableProgram('Comedy Central', timeOfDay);
            default:
                return this.generateGenericProgram(channel, timeOfDay);
        }
    }

    getTimeOfDay(hour) {
        if (hour >= 4 && hour < 6) return 'earlyMorning';
        if (hour >= 6 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 17) return 'afternoon';
        if (hour >= 17 && hour < 20) return 'earlyEvening';
        if (hour >= 20 && hour < 23) return 'primetime';
        return 'latenight';
    }

    generateNetworkProgram(network, timeOfDay, dayOfWeek, timeSlot) {
        const shows = this.programmingDatabase.networkShows[network];
        
        switch (timeOfDay) {
            case 'morning':
                if (timeSlot === 0) {
                    return {
                        title: shows.news[1] || `${network} Morning News`,
                        category: 'news',
                        duration: 60,
                        flags: ['LIVE', 'CC']
                    };
                } else {
                    return {
                        title: this.randomFromArray(shows.daytime),
                        category: 'soap',
                        duration: 30,
                        flags: ['CC']
                    };
                }
            case 'afternoon':
                return {
                    title: this.randomFromArray(shows.daytime),
                    category: 'soap',
                    duration: 30,
                    flags: ['CC']
                };
            case 'earlyEvening':
                if (timeSlot === 0) {
                    return {
                        title: shows.news[0] || `${network} Evening News`,
                        category: 'news',
                        duration: 30,
                        flags: ['CC', 'Stereo']
                    };
                } else {
                    return {
                        title: 'Wheel of Fortune',
                        category: 'game',
                        duration: 30,
                        flags: ['CC']
                    };
                }
            case 'primetime':
                return this.generatePrimetimeProgram(network, dayOfWeek);
            case 'latenight':
                return {
                    title: this.randomFromArray(shows.latenight),
                    category: 'talk',
                    duration: 60,
                    flags: ['CC']
                };
            default:
                return {
                    title: `${network} Programming`,
                    category: 'misc',
                    duration: 30,
                    flags: ['CC']
                };
        }
    }

    generatePrimetimeProgram(network, dayOfWeek) {
        const shows = this.programmingDatabase.networkShows[network];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = days[dayOfWeek];

        // Define primetime schedules
        const primetimeSchedules = {
            NBC: {
                Monday: ['Fresh Prince of Bel-Air', 'The Jeff Foxworthy Show'],
                Tuesday: ['Wings', 'NewsRadio'],
                Wednesday: ['Unsolved Mysteries', 'Dateline NBC'],
                Thursday: ['Friends', 'Seinfeld'],
                Friday: ['Unsolved Mysteries', 'Homicide: Life on the Street'],
                Saturday: ['Emergency!', 'The Pretender'],
                Sunday: ['NBC Sunday Night Movie']
            },
            CBS: {
                Monday: ['The Nanny', 'Murphy Brown'],
                Tuesday: ['CBS Tuesday Movie'],
                Wednesday: ['Touched by an Angel', 'Cybill'],
                Thursday: ['Murder, She Wrote'],
                Friday: ['Dr. Quinn, Medicine Woman', 'Walker, Texas Ranger'],
                Saturday: ['Walker, Texas Ranger'],
                Sunday: ['60 Minutes', 'Murder, She Wrote']
            },
            ABC: {
                Monday: ['Coach', 'Monday Night Football'],
                Tuesday: ['Roseanne', 'Home Improvement'],
                Wednesday: ['Ellen', 'The Drew Carey Show'],
                Thursday: ['Family Matters', 'Boy Meets World'],
                Friday: ['Family Matters', 'Sabrina'],
                Saturday: ['ABC Saturday Movie'],
                Sunday: ['America\'s Funniest Home Videos', 'Lois & Clark']
            },
            FOX: {
                Monday: ['Melrose Place'],
                Tuesday: ['The Simpsons', 'The X-Files'],
                Wednesday: ['Beverly Hills 90210'],
                Thursday: ['Living Single', 'New York Undercover'],
                Friday: ['The Simpsons', 'Millennium'],
                Saturday: ['Cops', 'America\'s Most Wanted'],
                Sunday: ['The Simpsons', 'The X-Files']
            }
        };

        const daySchedule = primetimeSchedules[network]?.[day] || shows.sitcoms;
        const showTitle = this.randomFromArray(daySchedule);

        return {
            title: showTitle,
            category: this.getCategoryForShow(showTitle),
            duration: showTitle.includes('Movie') ? 120 : 30,
            flags: ['CC', 'Stereo']
        };
    }

    generatePremiumProgram(network, timeOfDay) {
        const genres = ['action', 'drama', 'comedy', 'thriller'];
        const genre = this.randomFromArray(genres);
        const movie = this.randomFromArray(this.programmingDatabase.premiumMovies[genre]);

        return {
            title: `"${movie.title}" (${movie.year})`,
            category: 'movie',
            year: movie.year,
            duration: this.getMovieDuration(genre),
            flags: ['No Commercial Interruption', 'Stereo']
        };
    }

    generateCableProgram(network, timeOfDay) {
        const shows = this.programmingDatabase.cableShows[network];
        if (!shows) return this.generateGenericProgram({ network }, timeOfDay);

        const showTypes = Object.keys(shows);
        const showType = this.randomFromArray(showTypes);
        const showTitle = this.randomFromArray(shows[showType]);

        return {
            title: showTitle,
            category: showType,
            duration: 30,
            flags: ['CC']
        };
    }

    generateNewsProgram(network, timeOfDay) {
        const newsShows = {
            morning: ['CNN Morning News', 'American Morning'],
            afternoon: ['CNN Live Today', 'Inside Politics'],
            primetime: ['The World Today', 'Larry King Live'],
            latenight: ['CNN Tonight', 'World Business Today']
        };

        const shows = newsShows[timeOfDay] || newsShows.afternoon;
        return {
            title: this.randomFromArray(shows),
            category: 'news',
            duration: 30,
            flags: ['LIVE', 'CC']
        };
    }

    generateSportsProgram(timeOfDay, dayOfWeek) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = days[dayOfWeek];

        if (day === 'Monday' && timeOfDay === 'primetime') {
            return {
                title: 'Monday Night Football',
                category: 'sports',
                duration: 180,
                flags: ['LIVE']
            };
        } else if (day === 'Sunday' && timeOfDay === 'afternoon') {
            return {
                title: 'NFL on ESPN',
                category: 'sports',
                duration: 180,
                flags: ['LIVE']
            };
        } else {
            return {
                title: 'SportsCenter',
                category: 'sports',
                duration: 30,
                flags: ['LIVE']
            };
        }
    }

    generateKidsProgram(timeOfDay) {
        const shows = this.programmingDatabase.cableShows.Nickelodeon;
        
        if (timeOfDay === 'latenight') {
            return {
                title: this.randomFromArray(shows.classic),
                category: 'classic',
                duration: 30,
                flags: ['CC']
            };
        } else {
            return {
                title: this.randomFromArray(shows.kids),
                category: 'kids',
                duration: 30,
                flags: ['CC']
            };
        }
    }

    generateDocumentaryProgram() {
        const shows = this.programmingDatabase.cableShows.Discovery.documentary;
        return {
            title: this.randomFromArray(shows),
            category: 'documentary',
            duration: 60,
            flags: ['CC']
        };
    }

    generateGenericProgram(channel, timeOfDay) {
        return {
            title: `${channel.network} Programming`,
            category: 'misc',
            duration: 30,
            flags: ['CC']
        };
    }

    getCategoryForShow(showTitle) {
        const comedies = ['Friends', 'Seinfeld', 'The Simpsons', 'Frasier', 'Home Improvement', 'Roseanne'];
        const dramas = ['ER', 'Law & Order', 'NYPD Blue', 'The X-Files', 'Melrose Place'];
        const news = ['60 Minutes', 'Dateline NBC', 'Primetime Live', '20/20'];

        if (comedies.some(show => showTitle.includes(show))) return 'comedy';
        if (dramas.some(show => showTitle.includes(show))) return 'drama';
        if (news.some(show => showTitle.includes(show))) return 'news';
        if (showTitle.includes('Movie')) return 'movie';
        return 'misc';
    }

    getMovieDuration(genre) {
        const durations = {
            action: 120,
            drama: 140,
            comedy: 100,
            thriller: 110
        };
        return durations[genre] || 120;
    }

    randomFromArray(array) {
        if (!array || array.length === 0) return 'Programming';
        return array[Math.floor(Math.random() * array.length)];
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedProgrammingGenerator;
} else if (typeof window !== 'undefined') {
    window.AdvancedProgrammingGenerator = AdvancedProgrammingGenerator;
}
