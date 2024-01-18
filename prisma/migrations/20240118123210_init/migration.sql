/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Issue` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uuid` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Issue] DROP CONSTRAINT [Issue_status_df];
ALTER TABLE [dbo].[Issue] ADD CONSTRAINT [Issue_status_df] DEFAULT 'todo' FOR [status];
ALTER TABLE [dbo].[Issue] ADD [uuid] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[Issue] ADD CONSTRAINT [Issue_uuid_key] UNIQUE NONCLUSTERED ([uuid]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
