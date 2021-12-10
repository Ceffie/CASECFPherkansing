﻿// <auto-generated />
using System;
using CASECFP_WebApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CASECFP_WebApi.Migrations
{
    [DbContext(typeof(CursusContext))]
    [Migration("20211207143045_uniques")]
    partial class uniques
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("CASECFP_WebApi.Models.Cursus", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.Property<int>("Duur")
                        .HasColumnType("int");

                    b.Property<string>("Titel")
                        .IsRequired()
                        .HasMaxLength(300)
                        .HasColumnType("nvarchar(300)");

                    b.HasKey("Id");

                    b.HasIndex("Titel", "Code")
                        .IsUnique();

                    b.ToTable("Cursus");
                });

            modelBuilder.Entity("CASECFP_WebApi.Models.CursusInstantie", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("CursusId")
                        .HasColumnType("int");

                    b.Property<DateTimeOffset>("StartDatum")
                        .HasColumnType("datetimeoffset");

                    b.HasKey("Id");

                    b.HasIndex("CursusId");

                    b.ToTable("CursusInstantie");
                });

            modelBuilder.Entity("CASECFP_WebApi.Models.CursusInstantie", b =>
                {
                    b.HasOne("CASECFP_WebApi.Models.Cursus", null)
                        .WithMany("CursusInstanties")
                        .HasForeignKey("CursusId");
                });

            modelBuilder.Entity("CASECFP_WebApi.Models.Cursus", b =>
                {
                    b.Navigation("CursusInstanties");
                });
#pragma warning restore 612, 618
        }
    }
}
