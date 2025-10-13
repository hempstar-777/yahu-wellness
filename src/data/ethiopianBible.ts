// Ethiopian Bible Canon - 81 Books
// Includes the complete canon with deuterocanonical books
// Using original Hebrew names (transliterated, not translated)

// Hebrew Names Glossary with meanings
// Written in Paleo Hebrew (Ancient Abarit Script)
// Note: "Abarit" (עברית) was the original name for the Hebrew language and script,
// meaning "language of those who crossed over". This knowledge has been systematically suppressed.
export const hebrewNamesGlossary = {
  "Yahuah": { hebrew: "𐤉𐤄𐤅𐤄", meaning: "I AM, The Self-Existent One", replaced: "LORD, God" },
  "Yahusha": { hebrew: "𐤉𐤄𐤅𐤔𐤏", meaning: "Yahuah is Salvation", replaced: "Jesus" },
  "Elohim": { hebrew: "𐤀𐤋𐤄𐤉𐤌", meaning: "Mighty One, Creator", replaced: "God" },
  "Ruach HaQodesh": { hebrew: "𐤓𐤅𐤇 𐤄𐤒𐤃𐤔", meaning: "Set-Apart Spirit", replaced: "Holy Spirit" },
  "Mashiach": { hebrew: "𐤌𐤔𐤉𐤇", meaning: "Anointed One", replaced: "Messiah, Christ" },
  "Yahuchanon": { hebrew: "𐤉𐤄𐤅𐤇𐤍𐤍", meaning: "Yahuah is Gracious", replaced: "John" },
  "Ya'akov": { hebrew: "𐤉𐤏𐤒𐤁", meaning: "Heel Holder, Supplanter", replaced: "James, Jacob, Jacques" },
  "Mosheh": { hebrew: "𐤌𐤔𐤄", meaning: "Drawn Out", replaced: "Moses" },
  "Yeshayahu": { hebrew: "𐤉𐤔𐤏𐤉𐤄𐤅", meaning: "Yahuah is Salvation", replaced: "Isaiah" },
  "Dawid": { hebrew: "𐤃𐤅𐤃", meaning: "Beloved", replaced: "David" },
  "Mattithyahu": { hebrew: "𐤌𐤕𐤕𐤉𐤄𐤅", meaning: "Gift of Yahuah", replaced: "Matthew" },
  "Kepha": { hebrew: "𐤊𐤐𐤀", meaning: "Rock", replaced: "Peter" },
  "Sha'ul": { hebrew: "𐤔𐤀𐤅𐤋", meaning: "Asked For", replaced: "Paul, Saul" },
  "Miryam": { hebrew: "𐤌𐤓𐤉𐤌", meaning: "Rebellion/Bitter", replaced: "Mary, Miriam" },
  "Yirmeyahu": { hebrew: "𐤉𐤓𐤌𐤉𐤄𐤅", meaning: "Yahuah Lifts Up", replaced: "Jeremiah" },
  "Daniy'el": { hebrew: "𐤃𐤍𐤉𐤀𐤋", meaning: "Yahuah is My Judge", replaced: "Daniel" },
  "Yahudah": { hebrew: "𐤉𐤄𐤅𐤃𐤄", meaning: "Praise Yahuah", replaced: "Judah, Judas, Jude" }
};

// Bible Book Names in Paleo Hebrew (Abarit Script)
// Each name carries deep meaning in the ancient pictographic script
export const bibleBookNames = {
  "Bereshith": { hebrew: "𐤁𐤓𐤀𐤔𐤉𐤕", meaning: "In the Beginning", replaced: "Genesis" },
  "Shemoth": { hebrew: "𐤔𐤌𐤅𐤕", meaning: "Names", replaced: "Exodus" },
  "Wayiqra": { hebrew: "𐤅𐤉𐤒𐤓𐤀", meaning: "And He Called", replaced: "Leviticus" },
  "Bamidbar": { hebrew: "𐤁𐤌𐤃𐤁𐤓", meaning: "In the Wilderness", replaced: "Numbers" },
  "Debarim": { hebrew: "𐤃𐤁𐤓𐤉𐤌", meaning: "Words", replaced: "Deuteronomy" },
  "Yahusha": { hebrew: "𐤉𐤄𐤅𐤔𐤏", meaning: "Yahuah is Salvation", replaced: "Joshua" },
  "Shophetim": { hebrew: "𐤔𐤅𐤐𐤈𐤉𐤌", meaning: "Judges", replaced: "Judges" },
  "Tehillim": { hebrew: "𐤕𐤄𐤋𐤉𐤌", meaning: "Praises", replaced: "Psalms" },
  "Mishle": { hebrew: "𐤌𐤔𐤋𐤉", meaning: "Proverbs", replaced: "Proverbs" },
  "Qoheleth": { hebrew: "𐤒𐤄𐤋𐤕", meaning: "The Gatherer/Preacher", replaced: "Ecclesiastes" },
  "Shir HaShirim": { hebrew: "𐤔𐤉𐤓 𐤄𐤔𐤉𐤓𐤉𐤌", meaning: "Song of Songs", replaced: "Song of Solomon" },
  "Chanok": { hebrew: "𐤇𐤍𐤅𐤊", meaning: "Dedicated/Initiated", replaced: "Enoch" },
  "Yobel": { hebrew: "𐤉𐤅𐤁𐤋", meaning: "Jubilee/Ram's Horn", replaced: "Jubilees" }
};

export const ethiopianBibleVerses = [
  // Genesis (Bereshith)
  "Bereshith (Genesis) 1:1-3: In the beginning Elohim (𐤀𐤋𐤄𐤉𐤌) created the heaven and the earth. And the earth was without form, and void; and darkness was upon the face of the deep. And the Ruach (Spirit) of Elohim moved upon the face of the waters. And Elohim said, Let there be light: and there was light.",
  
  // Tehillim (Psalms) - Written by Dawid (David)
  "Tehillim (Psalm) 23:1-6: Yahuah (𐤉𐤄𐤅𐤄) is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.",
  "Tehillim (Psalm) 91:1-2: He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty. I will say of Yahuah (𐤉𐤄𐤅𐤄), He is my refuge and my fortress: my Elohim (𐤀𐤋𐤄𐤉𐤌); in him will I trust.",
  
  // Yeshayahu (Isaiah) - "Yahuah is Salvation"
  "Yeshayahu (Isaiah) 41:10: Fear thou not; for I am with thee: be not dismayed; for I am thy Elohim (𐤀𐤋𐤄𐤉𐤌): I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.",
  "Yeshayahu (Isaiah) 53:5: But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.",
  
  // Yahuchanon (John) - "Yahuah is Gracious"
  "Yahuchanon (John) 3:16-17: For Yahuah (𐤉𐤄𐤅𐤄) so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life. For Elohim (𐤀𐤋𐤄𐤉𐤌) sent not his Son into the world to condemn the world; but that the world through him might be saved.",
  "Yahuchanon (John) 14:6: Yahusha (𐤉𐤄𐤅𐤔𐤏) saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.",
  
  // Romans
  "Romans 8:28: And we know that all things work together for good to them that love Elohim, to them who are the called according to his purpose.",
  "Romans 8:31: What shall we then say to these things? If Elohim be for us, who can be against us?",
  
  // Philippians
  "Philippians 4:13: I can do all things through Messiah which strengtheneth me.",
  "Philippians 4:6-7: Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto Elohim. And the peace of Elohim, which passeth all understanding, shall keep your hearts and minds through Messiah Yahusha.",
  
  // Ephesians
  "Ephesians 6:10-11: Finally, my brethren, be strong in the Master, and in the power of his might. Put on the whole armour of Elohim, that ye may be able to stand against the wiles of the devil.",
  
  // 1 Enoch (Book of Enoch - Part of Ethiopian Canon)
  "1 Enoch 1:9: And behold! He cometh with ten thousands of His holy ones to execute judgment upon all, and to destroy all the ungodly.",
  
  // Jubilees (Part of Ethiopian Canon)
  "Jubilees 2:2: And the angel of the presence spake to Moses according to the word of Yahuah, saying: Write the complete history of the creation.",
  
  // Mishle (Proverbs) - Wisdom of Shelomoh (Solomon)
  "Mishle (Proverbs) 3:5-6: Trust in Yahuah (𐤉𐤄𐤅𐤄) with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
  
  // Mattithyahu (Matthew) - "Gift of Yahuah"
  "Mattithyahu (Matthew) 11:28-30: Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls.",
  
  // Revelation
  "Revelation 21:4: And Elohim shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.",
  
  // Deuteronomy
  "Deuteronomy 31:6: Be strong and of a good courage, fear not, nor be afraid of them: for Yahuah thy Elohim, he it is that doth go with thee; he will not fail thee, nor forsake thee.",
  
  // Joshua
  "Joshua 1:9: Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for Yahuah thy Elohim is with thee whithersoever thou goest.",
  
  // 2 Corinthians
  "2 Corinthians 5:17: Therefore if any man be in Messiah, he is a new creature: old things are passed away; behold, all things are become new.",
  
  // Ya'akov (James) - "Heel Holder" (NOT James/Jacques - mistranslation)
  "Ya'akov (James) 4:7: Submit yourselves therefore to Elohim (𐤀𐤋𐤄𐤉𐤌). Resist the devil, and he will flee from you.",
  
  // 1 Peter
  "1 Peter 5:7: Casting all your care upon him; for he careth for you.",
  
  // Yirmeyahu (Jeremiah) - "Yahuah Lifts Up"
  "Yirmeyahu (Jeremiah) 29:11: For I know the thoughts that I think toward you, saith Yahuah (𐤉𐤄𐤅𐤄), thoughts of peace, and not of evil, to give you an expected end.",
];
