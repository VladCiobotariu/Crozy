export type GraphQLPageFilter = {
    first?: number;
    after?: string;
    last?: number;
    before?: string;
}

export type PageFilter = {
    graphQLFilter: GraphQLPageFilter;
    pageSize: number;
    currentPage: number;
}