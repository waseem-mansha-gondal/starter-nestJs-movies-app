// import express, {Request, Response} from 'express';
// import { Query } from 'mongoose';
class APIFeatures {
  query: any;
  queryString: any;
  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // console.log("in the filter");
    const queryobj = { ...this.queryString };
    const excludesfields = ['page', 'sort', 'limit', 'field'];
    excludesfields.forEach((el) => delete queryobj[el]);
    // advance filtering
    let querystr: any = JSON.stringify(queryobj);
    // console.log(querystr);

    querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    console.log(querystr);
    const title: any = querystr.title;
    // console.log(qs);
    this.query.findAll({ where: { title } });
    return this;
  }

  // sorting
  //   sort() {
  //     if (this.queryString.sort) {
  //       const sortby = this.queryString.sort.split(',').join(' ');
  //       // console.log(sortby);
  //       this.query = this.query.sort(sortby);
  //     } else {
  //       this.query = this.query.sort('-createdate');
  //     }
  //     //  console.log("in sorting")
  //     return this;
  //   }
  //   // Limiting
  //   limmitField() {
  //     if (this.queryString.field) {
  //       // console.log('hi in');
  //       const fields = this.queryString.field.split(',').join(' ');
  //       // console.log(fields);
  //       this.query = this.query.select(fields);
  //     } else {
  //       this.query = this.query.select('-__v');
  //     }
  //     // console.log("in the limit field");
  //     return this;
  //   }
  //   // paginate
  //   paginate() {
  //     const page = this.queryString.pages * 1 || 1;
  //     // console.log(page);
  //     const limit = this.queryString.limit * 1 || 100;
  //     const skip = (page - 1) * limit;
  //     this.query = this.query.skip(skip).limit(limit);
  //     // console.log("in the paginate");
  //     return this;
  //   }
}

export default APIFeatures;
