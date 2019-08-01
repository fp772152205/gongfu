//全局方法
export const local = {
    saveObjArr: function(name, data) { //localStorage 存储数组对象的方法
        localStorage.setItem(name, JSON.stringify(data))
    },
    getObjArr(name) { //localStorage 获取数组对象的方法
        return JSON.parse(window.localStorage.getItem(name));
    }
}
export const session = {
    saveObjArr: function(name, data) { //localStorage 存储数组对象的方法
        sessionStorage.setItem(name, JSON.stringify(data))
    },
    getObjArr(name) { //localStorage 获取数组对象的方法
        return JSON.parse(window.sessionStorage.getItem(name));
    }
}

export const getUserPageList = (params) => {
    let data = [{
            "id": "4343BFA7-8DD4-6F7A-BF70-6E293C761B41",
            "realName": "Cade",
            "userName": "Mclaughlin",
            "email": "vel@Sednunc.net",
            "account": 5947
        },
        {
            "id": "E44F2FE0-73B7-D649-A06A-AACD3BE64BBF",
            "realName": "Tate",
            "userName": "Love",
            "email": "mollis.vitae@euismodetcommodo.co.uk",
            "account": 58522
        },
        {
            "id": "871A3BC6-2276-1799-4636-166E8E51F25D",
            "realName": "Uriah",
            "userName": "Ware",
            "email": "arcu@lobortisquam.org",
            "account": 37742
        },
        {
            "id": "72766926-9BB0-BD9D-A86F-43CF1C44103C",
            "realName": "Declan",
            "userName": "Wynn",
            "email": "sagittis.felis@iaculisaliquet.ca",
            "account": 44844
        },
        {
            "id": "6BB7970D-D472-1C75-690D-326C2A857483",
            "realName": "Kevin",
            "userName": "Mccray",
            "email": "vel.pede@Curabiturvel.com",
            "account": 34242
        },
        {
            "id": "1DB213DA-2627-EDF3-6154-C40A8E7794FA",
            "realName": "Todd",
            "userName": "Glenn",
            "email": "pede.Cum.sociis@Vivamusmolestie.edu",
            "account": 132205
        },
        {
            "id": "7977E341-A4CA-612C-AD2A-E810CE2F3C9D",
            "realName": "Hayes",
            "userName": "Weaver",
            "email": "mollis.vitae@vestibulummassa.co.uk",
            "account": 42939
        },
        {
            "id": "11EA5726-40B3-970A-EE41-8AD6E8BBF210",
            "realName": "Ishmael",
            "userName": "Small",
            "email": "Vivamus@Aeneaneget.edu",
            "account": 122301
        },
        {
            "id": "9D239F02-08B9-8E54-5DAB-444165D507D4",
            "realName": "Peter",
            "userName": "Mckay",
            "email": "Quisque@arcu.co.uk",
            "account": 108994
        },
        {
            "id": "F3AEBDC5-2913-98D2-AEA1-0904BE045221",
            "realName": "Tucker",
            "userName": "Winters",
            "email": "eget.tincidunt.dui@Inlorem.edu",
            "account": 25685
        },
        {
            "id": "5711E4F7-9CFB-FEEA-849B-F8DC82CA2F4E",
            "realName": "Clarke",
            "userName": "Maldonado",
            "email": "Mauris.nulla.Integer@leoelementum.net",
            "account": 114700
        },
        {
            "id": "E3CFC576-B0DD-9FD5-6FEA-F93CB39E8243",
            "realName": "Bradley",
            "userName": "Branch",
            "email": "Cras.lorem@vulputate.org",
            "account": 93419
        },
        {
            "id": "645913B8-3BBD-8E04-D695-1939AAA3EF31",
            "realName": "Kadeem",
            "userName": "Sanders",
            "email": "et.rutrum.eu@nisidictum.com",
            "account": 99395
        },
        {
            "id": "9A2AF9D8-3DDB-DD86-DF2A-8436218517F4",
            "realName": "Valentine",
            "userName": "Perez",
            "email": "odio@magnatellusfaucibus.net",
            "account": 99293
        },
        {
            "id": "1A25B1AD-8CA3-E4A4-6CD8-F266D88512F9",
            "realName": "Julian",
            "userName": "Hinton",
            "email": "egestas@Utsagittis.ca",
            "account": 136286
        },
        {
            "id": "86D183C2-CEFF-584F-505C-628F97DD9334",
            "realName": "Arsenio",
            "userName": "Silva",
            "email": "diam.vel.arcu@porttitortellus.co.uk",
            "account": 105329
        },
        {
            "id": "4E89EAEB-BBC6-FD68-24AA-CEE479DB24AE",
            "realName": "Josiah",
            "userName": "Walker",
            "email": "Nunc@MorbimetusVivamus.com",
            "account": 49394
        },
        {
            "id": "FD36E90B-5DC9-63F6-73DF-5631FA485F6D",
            "realName": "Gavin",
            "userName": "Lawrence",
            "email": "porttitor.interdum.Sed@lorem.co.uk",
            "account": 50257
        },
        {
            "id": "9FB9BF60-1E12-1924-2D68-FA3B7B08B851",
            "realName": "Octavius",
            "userName": "Deleon",
            "email": "libero.dui.nec@hendreritaarcu.ca",
            "account": 62701
        },
        {
            "id": "A92A04A8-5F5F-8827-4318-D0CFA54EECD8",
            "realName": "Gage",
            "userName": "Gamble",
            "email": "mauris.sagittis.placerat@convallisligula.org",
            "account": 30110
        },
        {
            "id": "2B0221AB-D625-3B15-A9F1-70CECAAE7635",
            "realName": "Adam",
            "userName": "Webster",
            "email": "Nullam.vitae@Nulla.org",
            "account": 29433
        },
        {
            "id": "07D35722-468E-4B48-F7E2-CCE0241B6B60",
            "realName": "Barrett",
            "userName": "Koch",
            "email": "porttitor.scelerisque.neque@variuset.com",
            "account": 15836
        },
        {
            "id": "57D9A43E-4E91-78B8-0B68-DA830B698187",
            "realName": "Hammett",
            "userName": "Evans",
            "email": "mauris.rhoncus@Cumsociisnatoque.ca",
            "account": 53977
        },
        {
            "id": "606CDAA0-362E-B54A-F68E-2D4A3C8A57EF",
            "realName": "Acton",
            "userName": "Hoffman",
            "email": "Nullam@purussapiengravida.net",
            "account": 51351
        },
        {
            "id": "BA9D8655-413C-1E30-D319-F84080D96281",
            "realName": "Jackson",
            "userName": "Goff",
            "email": "Sed.nunc@et.org",
            "account": 119951
        },
        {
            "id": "5F1378CC-22B4-DBC4-48D3-50876349F004",
            "realName": "Leroy",
            "userName": "Reid",
            "email": "auctor.odio@dignissimmagnaa.org",
            "account": 94872
        },
        {
            "id": "ADC2B647-DF4D-0782-F2CE-921E5787B695",
            "realName": "Xander",
            "userName": "Brown",
            "email": "tellus.imperdiet.non@dictumeuplacerat.co.uk",
            "account": 153503
        },
        {
            "id": "C2B83C7B-8CDB-2B91-A7DB-015994F21BC0",
            "realName": "Honorato",
            "userName": "Hatfield",
            "email": "ornare@odioNam.org",
            "account": 153906
        },
        {
            "id": "20DDC666-D2A6-73D8-2C86-45DD64B1C5EE",
            "realName": "Joseph",
            "userName": "Garrison",
            "email": "elementum@malesuadafringilla.ca",
            "account": 15885
        },
        {
            "id": "97BA91E7-2A44-9924-19DD-9DA3223ED4F3",
            "realName": "Hammett",
            "userName": "Petersen",
            "email": "semper.pretium@eleifendnuncrisus.edu",
            "account": 92645
        },
        {
            "id": "BD99F9FA-643D-4761-81AE-87FFBB5CC76E",
            "realName": "Allistair",
            "userName": "Mccoy",
            "email": "odio.semper@Praesent.net",
            "account": 35344
        },
        {
            "id": "BDBBC28D-B4C7-20F5-DDE1-AD0BA5E3A1F8",
            "realName": "Xanthus",
            "userName": "Cote",
            "email": "ornare.In@semperNamtempor.co.uk",
            "account": 74451
        },
        {
            "id": "94C4177F-3748-8154-CA00-37A523A8A0C6",
            "realName": "Brody",
            "userName": "Bradford",
            "email": "massa.Integer.vitae@sedleo.edu",
            "account": 50228
        },
        {
            "id": "4F3DA802-31A7-C345-D7C1-26A5ACC0965A",
            "realName": "Brenden",
            "userName": "Barron",
            "email": "Pellentesque.habitant.morbi@necimperdiet.co.uk",
            "account": 138195
        },
        {
            "id": "B50905E6-6CAD-39E5-111D-93C3E01D8B7D",
            "realName": "Oscar",
            "userName": "Mayer",
            "email": "felis@risus.org",
            "account": 65948
        },
        {
            "id": "226C07CD-3A57-0CA0-A911-79A962E218CF",
            "realName": "Roth",
            "userName": "Fletcher",
            "email": "vel@ornarelectusante.co.uk",
            "account": 2945
        },
        {
            "id": "F15DC06C-A9F1-C394-7211-DFAEF41420CF",
            "realName": "Dylan",
            "userName": "Espinoza",
            "email": "lectus.quis@vulputateposuere.org",
            "account": 120408
        },
        {
            "id": "98AC0651-9646-06FD-32A2-CE6E5C1E7BF5",
            "realName": "Omar",
            "userName": "Tanner",
            "email": "nibh.Quisque@vehiculaPellentesquetincidunt.org",
            "account": 8387
        },
        {
            "id": "6FE941C2-422D-42A5-2338-39305D5051BD",
            "realName": "Ivan",
            "userName": "Shaffer",
            "email": "volutpat.Nulla@dolor.org",
            "account": 53374
        },
        {
            "id": "0E508B06-B9DF-FCA3-32BF-A07949F4C309",
            "realName": "Mannix",
            "userName": "Wilkinson",
            "email": "diam.lorem.auctor@liberoat.com",
            "account": 41955
        },
        {
            "id": "B489A5C2-7177-1EFC-BFAE-AE853E0CCEB8",
            "realName": "Lars",
            "userName": "Weber",
            "email": "mauris@acturpisegestas.net",
            "account": 61920
        },
        {
            "id": "B81AEDD3-904D-7587-4394-6E41AC3011B3",
            "realName": "Amir",
            "userName": "Farrell",
            "email": "Aliquam@aliquet.ca",
            "account": 100028
        },
        {
            "id": "A2515306-391E-9465-73F0-8ECC5B982D7D",
            "realName": "Vladimir",
            "userName": "Harrison",
            "email": "vitae.nibh.Donec@lacusvariuset.com",
            "account": 11178
        },
        {
            "id": "2ED84866-BCC1-5A94-DEB6-6573586DDB2D",
            "realName": "Silas",
            "userName": "Robles",
            "email": "aliquam.eros.turpis@mitempor.com",
            "account": 8832
        },
        {
            "id": "B8725C59-AE79-12A8-B157-23CEAC4490DA",
            "realName": "Boris",
            "userName": "Sampson",
            "email": "et.rutrum.non@Classaptenttaciti.ca",
            "account": 144493
        },
        {
            "id": "EB665D4B-83DD-E67F-6393-186202B96C50",
            "realName": "Devin",
            "userName": "Zimmerman",
            "email": "cubilia.Curae@nonarcu.com",
            "account": 124132
        },
        {
            "id": "8BF7C88F-6F5A-586A-2547-BC9C901297DA",
            "realName": "Yasir",
            "userName": "Hanson",
            "email": "hendrerit.id.ante@turpis.com",
            "account": 112416
        },
        {
            "id": "DC611730-3E97-B053-B035-C026041406A4",
            "realName": "Reece",
            "userName": "Boyer",
            "email": "enim@in.net",
            "account": 99464
        },
        {
            "id": "8AD84985-252E-33B9-C686-005CC65127B2",
            "realName": "Ahmed",
            "userName": "English",
            "email": "Aliquam@pedeCum.co.uk",
            "account": 88900
        },
        {
            "id": "C76E8729-28F8-C1A1-F716-E9CF51893384",
            "realName": "Wayne",
            "userName": "Santiago",
            "email": "Donec@magna.net",
            "account": 95131
        },
        {
            "id": "643CC47C-B012-C360-8FF3-9087DF2451CC",
            "realName": "Zane",
            "userName": "Hughes",
            "email": "accumsan.neque.et@netuset.ca",
            "account": 109544
        },
        {
            "id": "9FDA6F8C-8C38-4D2E-FCE9-0BD438BFC7C7",
            "realName": "Kevin",
            "userName": "Fowler",
            "email": "auctor.quis@elementumduiquis.org",
            "account": 64518
        },
        {
            "id": "7B845289-AC32-2838-050B-70D816E64A8A",
            "realName": "Thane",
            "userName": "Patel",
            "email": "dui@convallisligula.net",
            "account": 135176
        },
        {
            "id": "07EDD8A7-04B2-01AD-A832-7CF2E9B29D5C",
            "realName": "Ralph",
            "userName": "Mckenzie",
            "email": "justo.faucibus@antedictummi.edu",
            "account": 98387
        },
        {
            "id": "37FCCD3F-2AC5-C5BE-7EB9-C548E373FAC6",
            "realName": "Addison",
            "userName": "Olsen",
            "email": "tellus.non.magna@ametmassa.com",
            "account": 106531
        },
        {
            "id": "32E46285-C4A4-CDC2-F2DD-2108002358E5",
            "realName": "Linus",
            "userName": "Ross",
            "email": "posuere@nislNulla.org",
            "account": 38158
        },
        {
            "id": "08AF5C6C-984B-DFDE-32AF-A70C1B3BCDFC",
            "realName": "Dante",
            "userName": "Skinner",
            "email": "nascetur.ridiculus@pedeCum.org",
            "account": 122933
        },
        {
            "id": "928C5F10-781E-0CF7-8F47-B38F525A382B",
            "realName": "Bert",
            "userName": "Rodgers",
            "email": "lobortis.nisi.nibh@Etiamlaoreet.ca",
            "account": 130687
        },
        {
            "id": "3A11AB35-8171-92A3-92BC-0BF08DC05D78",
            "realName": "Rooney",
            "userName": "Hayden",
            "email": "interdum.feugiat@temporbibendum.org",
            "account": 57519
        },
        {
            "id": "CA269D80-AF84-A729-52BA-3FC07566011E",
            "realName": "Slade",
            "userName": "Odom",
            "email": "dictum@rutrummagna.co.uk",
            "account": 2751
        },
        {
            "id": "259DFD54-82D5-C131-133D-454E141F1BEB",
            "realName": "Reed",
            "userName": "Willis",
            "email": "ut@Vivamuseuismodurna.co.uk",
            "account": 56236
        },
        {
            "id": "96EF648B-EDB5-E96A-6EB8-16F26C657275",
            "realName": "Keane",
            "userName": "Lane",
            "email": "dictum@scelerisquescelerisque.net",
            "account": 35389
        },
        {
            "id": "F702F577-82FE-4D33-B679-9A4BB55B1B60",
            "realName": "Clark",
            "userName": "Robinson",
            "email": "lobortis.Class@placeratorcilacus.org",
            "account": 140551
        },
        {
            "id": "DA160228-17E9-060E-1E10-CE4FBE8CBE71",
            "realName": "Devin",
            "userName": "Conner",
            "email": "dictum.Phasellus@auctor.org",
            "account": 3817
        },
        {
            "id": "9A15B971-E58B-E2F7-7AD6-75DABB39E036",
            "realName": "Ross",
            "userName": "Harrison",
            "email": "Duis.dignissim.tempor@Phasellusin.net",
            "account": 10346
        },
        {
            "id": "A6A710F5-E9F6-4FF8-BF4C-1B944D7C4EAC",
            "realName": "Akeem",
            "userName": "Joyce",
            "email": "et.magnis@maurisrhoncus.ca",
            "account": 65128
        },
        {
            "id": "CBB3F914-2D5A-9DFD-6D28-700277E1EC51",
            "realName": "Tate",
            "userName": "Everett",
            "email": "ut@tellusloremeu.co.uk",
            "account": 108511
        },
        {
            "id": "925BF5C9-2A2B-E4C3-2146-C3EFEAA2A5CE",
            "realName": "Reece",
            "userName": "Baxter",
            "email": "quis.lectus@facilisislorem.ca",
            "account": 130147
        },
        {
            "id": "C4CFF522-3B4A-5B27-85FF-6F8DBA371822",
            "realName": "Dorian",
            "userName": "Middleton",
            "email": "ligula.Aenean@Sedetlibero.com",
            "account": 41470
        },
        {
            "id": "321C8E49-8CCA-F3E1-4357-EE8463C2EFF3",
            "realName": "Oleg",
            "userName": "Bell",
            "email": "amet@et.edu",
            "account": 46547
        },
        {
            "id": "90DDE721-8FD4-3B88-4BB4-2BED0A97161C",
            "realName": "Norman",
            "userName": "Duncan",
            "email": "sagittis.lobortis.mauris@pretiumneque.ca",
            "account": 150855
        },
        {
            "id": "5AAB08F7-1E49-1157-EE76-1B58E373BADF",
            "realName": "Kato",
            "userName": "Kim",
            "email": "aliquam@quam.org",
            "account": 35011
        },
        {
            "id": "12A22BB9-B20C-A181-8206-EBDBA43CDA7A",
            "realName": "Kaseem",
            "userName": "House",
            "email": "mollis@Maurisnon.ca",
            "account": 128379
        },
        {
            "id": "5D1F289C-CCD2-B498-7163-50A6397D19E4",
            "realName": "Phillip",
            "userName": "Howe",
            "email": "nulla.magna@antedictumcursus.org",
            "account": 94162
        },
        {
            "id": "E071FE70-8F9C-A58F-6F30-B3554F6FB199",
            "realName": "Chaney",
            "userName": "Green",
            "email": "non.dui@aliquameros.edu",
            "account": 138894
        },
        {
            "id": "FCFCB73A-9B00-4636-0439-DEEB75AB3CD9",
            "realName": "Avram",
            "userName": "Henderson",
            "email": "pretium.aliquet.metus@ante.org",
            "account": 136080
        },
        {
            "id": "6D0D10CC-CD6D-60B6-7819-76D389498A78",
            "realName": "Kelly",
            "userName": "Ballard",
            "email": "pede.Cum.sociis@elita.edu",
            "account": 47239
        },
        {
            "id": "06E840AF-BD5F-4B6E-9812-510554469060",
            "realName": "Eric",
            "userName": "Sloan",
            "email": "Donec.feugiat.metus@Morbisitamet.org",
            "account": 27019
        },
        {
            "id": "A9F15816-B539-CB61-F539-786893FC4C6B",
            "realName": "Samson",
            "userName": "Espinoza",
            "email": "ultrices.posuere@nondapibusrutrum.ca",
            "account": 46699
        },
        {
            "id": "71A54825-6B0E-D48B-933F-161C79862246",
            "realName": "Neil",
            "userName": "Wilder",
            "email": "turpis.egestas.Fusce@dolor.com",
            "account": 143232
        },
        {
            "id": "7EC59380-E8F9-5535-25AE-53B5C8A19011",
            "realName": "Talon",
            "userName": "Rivers",
            "email": "sagittis.Duis@felispurusac.co.uk",
            "account": 10821
        },
        {
            "id": "C6631D49-E8AE-693C-6A58-99207CD667F7",
            "realName": "Castor",
            "userName": "Doyle",
            "email": "Vestibulum@loremfringillaornare.com",
            "account": 145225
        },
        {
            "id": "7ED1C7EC-C101-37C4-BB76-F76ED53F38A0",
            "realName": "Akeem",
            "userName": "Mcdaniel",
            "email": "Donec.est@Cumsociis.org",
            "account": 60482
        },

    ]
    if (params.account) {
        data = data.filter(e => {
            return e.account == params.account
        })
    }
    let start = (params.pageIndex - 1) * params.pageSize;

    let end = params.pageIndex * params.pageSize;
    return { data: data.slice(start, end), count: 83 };

}