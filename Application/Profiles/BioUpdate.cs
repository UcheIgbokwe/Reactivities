using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Profiles
{
    public class BioUpdate
    {
        public class Command : IRequest
        {
            public string DisplayName { get; set; }
            public string Bio { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, UserManager<AppUser> userManager, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _userManager = userManager;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                
                var user = new AppUser();
                user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());

                user.DisplayName = request.DisplayName;
                user.Bio = request.Bio;

                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded)
                {
                    return Unit.Value;
                }
                else
                {
                    throw new Exception("Problem updating changes");
                }

            }
        }
    }
}