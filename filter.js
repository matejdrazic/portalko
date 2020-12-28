function filter(choosenCategory, promise) {
    console.log(promise);
    console.log(choosenCategory);
    console.log(promise.length);
    let filtriraniClanci = [];

    for (let i = 0; i < promise.length; i++) { 
        if (promise[i].category[0] == choosenCategory[0] || promise[i].category[0] == choosenCategory[1] || promise[i].category[0] == choosenCategory[2]) {
            let filtriraniClanak = {
                "title": promise[i].title,
                "category": promise[i].category,
                "link": promise[i].link,
                "content": promise[i].content,
            }
            filtriraniClanci.push(filtriraniClanak);
        } else {
            console.log("nista od clanka");
        }
    }

    return filtriraniClanci;
}