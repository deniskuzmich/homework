
export const commentsService = {
  async getCommentById(id: string, params: any) {
    let commentQueryRepository;
    const comment = await commentQueryRepository.getCommentById(id);
}