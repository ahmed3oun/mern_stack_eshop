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

        this.query = this.query.find({ ...keyword })
        return this;
    }

    filter(){
        const queryCopy = { ...this.queryStr} ;
        //Removing fields from the query
        const removeFields = ['keyword' , 'limit' , 'page'];
        removeFields.forEach(el => delete queryCopy[el])
        
        //http://localhost:3000/products?category=6059165279ccc91f74c05c91&price[gte]=1&price[lte]=40
        // Advance filter for price , rating ect
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g , match => `$${match}`)

        console.log(queryStr);//{"category":"6059165279ccc91f74c05c91","price":{"$gte":"1","$lte":"40"}}

        this.query=this.query.find(JSON.parse(queryStr))
        return this;
    }

    pagination(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1 
        const skip = resPerPage * ( currentPage -1 )

        this.query = this.query.limit(resPerPage).skip(skip) 
        return this;
    }
}

module.exports = APIFeatures ;