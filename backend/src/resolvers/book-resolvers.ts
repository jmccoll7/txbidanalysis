import { ObjectType, Field, Resolver, Query } from "type-graphql";

// Type Definition
@ObjectType()
export class Book {
  @Field()
  title!: string;

  @Field()
  author!: string;
}

// Resolver
@Resolver(Book)
export class BookResolver {
  private bookCollection: Book[] = [
    {
      title: "The Awakening",
      author: "Kate Chopin",
    },
    {
      title: "City of Glass",
      author: "Paul Buttercup",
    },
  ];

  @Query(() => [Book])
  books() {
    return this.bookCollection;
  }
}