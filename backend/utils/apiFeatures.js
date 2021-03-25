class APIFeatures {
    constructor(query , queryStr){
        this.query = query ;
        this.queryStr = queryStr ;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name : {
                $regex : this.queryStr.keyword
                //$option : 'i'
            }
        } : {}
        console.log(keyword)

        this.query = this.query.find({ ...keyword })
        return this;
    }

    filter(){
        const queryCopy = { ...this.queryStr} ;
        //Removing fields from the query
        const removeFields = ['keyword' , 'limit' , 'page'];
        removeFields.forEach(el => delete queryCopy[el])

        // Advance filter for price , rating ect
        let queryStr = JSON.stringify(queryCopy)
        
        
        this.query=this.query.find(queryCopy)
        return this;
    }
}

module.exports = APIFeatures ;